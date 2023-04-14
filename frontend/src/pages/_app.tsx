import '@/styles/styles-reset.scss'
import '@/styles/global.scss'
import type { AppProps } from 'next/app'
import Layout from '@/components/layout'
import { ShopingCartContextProvider } from '@/context/ShoppingCartContext'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ShopingCartContextProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ShopingCartContextProvider>
  )
}
