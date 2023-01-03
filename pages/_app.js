import { RestauranteProvider } from '../context/RestaurantProvider'
import '../styles/globals.css'

export default function App({ Component, pageProps }) {
  return (
      <RestauranteProvider>
        <Component {...pageProps} />
      </RestauranteProvider>
  )
}
