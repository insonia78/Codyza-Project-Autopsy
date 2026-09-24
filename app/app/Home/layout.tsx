import AiTokenFieldsComponent from "../components/AiTokenFieldsComponent"
import AiResponseComponent from "../components/AiResponseComponent"
import styles from "./css/styles.module.css"
import { AiProvider } from "./AiProvider"


type Props = {
	children: React.ReactNode
}

export default function HomeLayout({ children }: Props) {

	return (
		<div className={styles['home-layout-container']}>
			<AiProvider>
				<div className={styles['home-page-container']}>
					<aside>
						<AiTokenFieldsComponent />
					</aside>
					<section style={{ flex: 1 }}>
						{children}
					</section>
				</div>
				<article style={{ flex: 1 }}>
					<AiResponseComponent />
				</article>
			</AiProvider>
		</div>

	)
}



