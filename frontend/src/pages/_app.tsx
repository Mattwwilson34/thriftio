import '@/styles/styles-reset.scss'
import '@/styles/global.scss'
import type { AppProps } from 'next/app'
import Layout from '@/components/layout'
import React, { createContext, useReducer } from 'react'

export const ShoppingCartSystem = createContext({})

const initailState = {
  cart: [],
}

export default function App({ Component, pageProps }: AppProps) {
  //
  const Reducers = (state, action) => {
    switch (action.type) {
      case 'ADD_TO_CART':
        const { productData } = action.payload
        const { cart } = state
        const newCart = [...cart, productData]
        return { ...state, cart: newCart }
    }
  }

  const [state, dispatch] = useReducer(Reducers, initailState)

  return (
    <ShoppingCartSystem.Provider value={{ state, dispatch }}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ShoppingCartSystem.Provider>
  )
}
