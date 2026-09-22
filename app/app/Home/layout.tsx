
import AiTokenFieldsComponent from '../components/AiTokenFieldsComponent'
import styles from './styles.module.css'
type Props = {
	children: React.ReactNode
}

export default function HomeLayout({ children }: Props) {

	return (
		<section style={{ flex: 1 }}>
				{children}
		</section>
		


	)
}



