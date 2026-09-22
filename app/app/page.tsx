import { redirect } from 'next/dist/client/components/navigation'
import HomePage from './Home/page'

export default function RootPage() {
  redirect('/Home')
}
