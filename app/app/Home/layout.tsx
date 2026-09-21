import React from 'react'
import AiTokenFieldsComponent from '../components/AiTokenFieldsComponent'
import Link from 'next/link'

type Props = {
	children: React.ReactNode
}

export default function HomeLayout({ children }: Props) {
	return (
		<div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
			<header style={{ padding: '20px 24px', borderBottom: '1px solid #e5e7eb', background: '#fff' }}>
				<div style={{ maxWidth: 1200, margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
					<h1 style={{ margin: 0, fontSize: 20 }}>Codyza — Repo Analyzer</h1>
					<nav aria-label="Main navigation">
						<Link href="/" style={{ marginLeft: 12, color: '#2563eb', textDecoration: 'none' }}>Home</Link>
					</nav>
				</div>
			</header>

			<div style={{ display: 'flex', gap: 20, maxWidth: 1200, margin: '28px auto', padding: '0 16px', width: '100%' }}>
				
				<aside style={{ width: 320 }}>
					<AiTokenFieldsComponent />
				</aside>
				<main style={{ flex: 1 }}>
					{children}
				</main>
			</div>

			<footer style={{ borderTop: '1px solid #e5e7eb', padding: '12px 24px', background: '#fff' }}>
				<div style={{ maxWidth: 1200, margin: '0 auto', textAlign: 'center', fontSize: 13, color: '#6b7280' }}>
					Built by Codyza — lightweight repo analysis tool
				</div>
			</footer>
		</div>
	)
}

