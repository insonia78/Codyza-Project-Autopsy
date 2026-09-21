import { HomePageFeature } from '../feature/HomePageFeature'

import HomeLayout from './layout'

const HomePage = () => {
  return (
    <div>
      <HomeLayout>
        <HomePageFeature />
      </HomeLayout>
    </div>
  )
}

export default HomePage
