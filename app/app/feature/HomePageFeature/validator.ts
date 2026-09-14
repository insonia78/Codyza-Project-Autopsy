import * as yup from 'yup'

const repoRegex = /^[^/\s]+\/[^^/\s]+$/
const githubUrlRegex = /github\.com\/([^/\s]+\/[^^/\s]+)/

const schema = yup.object({
  repositoryName: yup
    .string()
    .required('Repository is required')
    .test(
      'owner-repo',
      'Repository must be in "owner/repo" format or a github.com URL',
      (val) => {
        if (!val) return false
        return repoRegex.test(val) || githubUrlRegex.test(val)
      }
    ),
  githubToken: yup
    .string()
    .nullable()
    .notRequired()
    .test('min-if-present', 'Token must be at least 10 characters', (val) => {
      if (!val) return true
      return val.length >= 10
    }),
})



export default schema
