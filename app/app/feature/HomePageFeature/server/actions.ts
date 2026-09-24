'use server'
const headers: Record<string, string> = {
    "Accept": "application/vnd.github+json",
    "X-GitHub-Api-Version": "2022-11-28"
}
export async function getRepo(value:any) {
   
    const repositoryName = value.repositoryName;
    const githubToken = value.githubToken;
    const aiApiKey = value.aiApiKey;
    const aiModel = value.aiModel;

    if (typeof repositoryName === 'string') {
        const url: string = await repositoryName?.replace("https://github.com/", "https://api.github.com/repos/");
        try {

            if (githubToken) {
                headers["Authorization"] = `Bearer ${githubToken}`;
            }
            const res = await fetch(url.trim(), { headers })
            const data = await res.json();

            return await analyzeRepo(data, aiApiKey, aiModel);
        
        } catch (e) {
            console.log(e);
        }

    }
}

async function analyzeRepo(repo: any,aiApiKey: string | undefined, aiModel: string | undefined) {

    try {
        const fullName: string = repo?.full_name || '';
        const [owner, name] = fullName.split('/');
        const defaultBranch: string = repo?.default_branch || 'main';


        // Parallel fetches for languages, contributors, tree, commits, issues
        const languagesP = fetchJson((repo as any).languages_url);
        const contributorsP = fetchJson((repo as any).contributors_url + '?per_page=100');
        const treeP = fetchJson(`https://api.github.com/repos/${owner}/${name}/git/trees/${defaultBranch}?recursive=1`);
        const commitsP = fetchJson(`https://api.github.com/repos/${owner}/${name}/commits?per_page=100`);
        const issuesP = fetchJson(`https://api.github.com/repos/${owner}/${name}/issues?state=open&per_page=100`);

        const [languages, contributors, tree, commits, issues] = await Promise.all([languagesP, contributorsP, treeP, commitsP, issuesP]);



        // Initialize file list and top-level directory set
        const fileList: string[] = Array.isArray(tree.tree) ? tree.tree.map((t: any) => t.path) : [];
        const topLevel = new Set<string>();
        for (const p of fileList) {
            const parts = p.split('/');
            if (parts[0]) topLevel.add(parts[0]);
        }

        const hasReadme = fileList.some(p => /(^|\/)README\.md$/i.test(p));
        const docsCount = fileList.filter(p => p.toLowerCase().endsWith('.md')).length;
        const ciPresent = fileList.some(p => p.startsWith('.github/') || p.includes('workflow') || p.includes('.circleci') || p.includes('azure-pipelines'));

        // Attempt to load package.json if present to extract dependencies
        let packageJson: any = null;
        if (fileList.includes('package.json')) {
            const pkgRes: any = await fetchJson(`https://api.github.com/repos/${owner}/${name}/contents/package.json`);
            if (pkgRes) {
                try {
                    const buff = Buffer.from(pkgRes?.content, pkgRes?.encoding || 'base64');
                    packageJson = JSON.parse(buff.toString('utf8'));
                } catch (e) {
                    packageJson = null;
                }
            }
        }

        // Filter out pull requests from issues list
        // const issues = Array.isArray(issuesRaw) ? issuesRaw.filter((i: any) => !i.pull_request) : [];

        // Compute simple activity timeline from commits fetched
        const commitDates = Array.isArray(commits) ? commits.map((c: any) => new Date(c.commit?.author?.date || c.commit?.committer?.date)) : [];
        const sortedDates = commitDates.filter(Boolean).sort((a: any, b: any) => a.getTime() - b.getTime());
        const firstCommit = sortedDates[0]?.toISOString() || null;
        const lastCommit = sortedDates[sortedDates.length - 1]?.toISOString() || null;

        // Heuristics for maintenance concerns (AI-generated suggestions)
        const maintenanceConcerns: Array<any> = [];
        if (!(repo as any).license) {
            maintenanceConcerns.push({
                issue: 'No license detected',
                detail: 'Repository has no license set in metadata.',
                ai_analysis: 'AI_ANALYSIS: Absence of a license can impede reuse and contribution; consider adding a clear open-source license if appropriate.'
            });
        }
        if (!hasReadme) {
            maintenanceConcerns.push({ issue: 'Missing README', detail: 'No README.md detected.', ai_analysis: 'AI_ANALYSIS: Documentation is limited; add a README with setup and contribution instructions.' });
        }
        if (issues.length > 10) {
            maintenanceConcerns.push({ issue: 'Many open issues', detail: `${issues.length} open issues`, ai_analysis: 'AI_ANALYSIS: High open-issue count may indicate maintenance backlog; triage and label important issues.' });
        }
        if (!ciPresent) {
            maintenanceConcerns.push({ issue: 'No CI detected', detail: 'No obvious CI/workflows found.', ai_analysis: 'AI_ANALYSIS: Adding CI improves code quality and reduces regressions.' });
        }
        if (packageJson && packageJson.dependencies && Object.keys(packageJson.dependencies).length === 0) {
            maintenanceConcerns.push({ issue: 'No runtime dependencies', detail: 'package.json exists but no dependencies listed.', ai_analysis: 'AI_ANALYSIS: Confirm whether dependencies are intentionally empty or missing; check build/runtime expectations.' });
        }


        // Compose findings with explicit AI-labeled conclusions section
        const findings = {
            repos: {
                id: (repo as any).id,
                name: (repo as any).name,
                full_name: (repo as any).full_name,
                html_url: (repo as any).html_url,
                description: (repo as any).description,
                language: (repo as any).language,
                created_at: (repo as any).created_at,
                updated_at: (repo as any).updated_at,
                pushed_at: (repo as any).pushed_at,
                open_issues_count: (repo as any).open_issues_count,
                default_branch: defaultBranch
            },
            structure: {
                top_level_folders: Array.from(topLevel).slice(0, 200),
                total_files: fileList.length,
                docs_markdown_count: docsCount,
                has_readme: hasReadme,
                ci_present: ciPresent,
            },
            languages,
            dependencies: {
                package_json: packageJson ? { dependencies: packageJson.dependencies || {}, devDependencies: packageJson.devDependencies || {} } : null
            },
            activity: {
                contributor_count: Array.isArray(contributors) ? contributors.length : 0,
                recent_commits_count: Array.isArray(commits) ? commits.length : 0,
                first_commit: firstCommit,
                last_commit: lastCommit
            },
            issues: {
                open_count: issues.length,
                open_issues: issues.map((i: any) => ({ number: i.number, title: i.title, url: i.html_url })).slice(0, 50)
            },
            maintenance_concerns: maintenanceConcerns,
            ai_conclusions: [
                { note: 'AI-generated analysis MUST be treated as suggestions, not facts.' },
                { summary: 'The conclusions below are produced by heuristics and simple repo scanning; verify before acting.' }
            ]
        };

        const OPENAI_KEY = aiApiKey
        const ai:any = { analysis: null }
        if (OPENAI_KEY) {
            try {
                const OPENAI_PROMPT_TEMPLATE = `You are a senior software engineer and repository maintainer. Given the repository scan below, produce a concise technical review focused on maintenance, security, and developer onboarding.\n\nRepository: {{REPO}}\nStars: {{STARS}}\nLanguages: {{LANGUAGES}}\nTop-level files: {{TOP_FILES}}\nDependencies: {{DEPENDENCIES}}\nOpen issues sample: {{OPEN_ISSUES}}\n\nProvide a short technical analysis of potential maintenance concerns and suggestions (3-5 bullets). Clearly label statements that are uncertain.`;

                const buildOpenAIPrompt = ({ repo, languages, fileList, packageJson, issues }:any) => {
                    const topFiles = Array.isArray(fileList) ? fileList.slice(0, 10).join(', ') : '';
                    const deps = packageJson ? Object.keys(packageJson.dependencies || {}).slice(0, 20).join(', ') : 'none';
                    const openIssues = Array.isArray(issues) ? issues.map((i: any) => i.title).join(' || ') : '';
                    return OPENAI_PROMPT_TEMPLATE.replace('{{REPO}}', repo?.full_name || repo)
                        .replace('{{STARS}}', String(repo?.stargazers_count || 'unknown'))
                        .replace('{{LANGUAGES}}', Object.keys(languages || {}).join(', '))
                        .replace('{{TOP_FILES}}', topFiles)
                        .replace('{{DEPENDENCIES}}', deps)
                        .replace('{{OPEN_ISSUES}}', openIssues);
                };

                const prompt = buildOpenAIPrompt({ repo, languages, fileList, packageJson, issues });

                const openaiRes = await fetch('https://api.openai.com/v1/chat/completions', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${OPENAI_KEY}` },
                    body: JSON.stringify({ model: aiModel || 'gpt-4o-mini', messages: [{ role: 'user', content: prompt }], max_tokens: 500 })
                })
                const openaiJson = await openaiRes.json()
                ai.analysis = openaiJson?.choices?.[0]?.message?.content || JSON.stringify(openaiJson)
            } catch (e) {
                ai.analysis = 'AI analysis failed: ' + (e as any).message
            }
        }  
        
        return ai.analysis;    
    } catch (error) {
        console.error(error);
    }

}
async function fetchJson(url: any) {
    const response = await fetch(url.trim(), { headers });
    return response.json();

}

