

type Props = {
	children: React.ReactNode
}

export default function HomeLayout({ children }: Props) {

	return (
		<div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
			<section style={{ flex: 1 }}>
				{children}
			</section>
		</div>


	)
}



