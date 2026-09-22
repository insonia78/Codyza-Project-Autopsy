
import AiTokenFieldsComponent from '../components/AiTokenFieldsComponent'
import { HomePageFeature } from '../feature/HomePageFeature'
import styles from './styles.module.css'

const HomePage = () => {
  return (
    <div className={styles.row}>
      <aside className={styles.sidebar}>
        <AiTokenFieldsComponent />
      </aside>
      <main className={styles.main}>
        <HomePageFeature />
      </main>
    </div>
  )
}

export default HomePage
