import { Product } from '@/types/types'
import React, { ReactNode, createContext, useReducer } from 'react'

interface Props {
  children: ReactNode
}

interface Action {
  type: string
  payload?: any
}

interface State {
  cart: Product[]
}

interface ShoppingCartContextType {
  state: State
  dispatch: React.Dispatch<Action>
}

// create shopping cart context
const ShoppingCartContext = createContext<ShoppingCartContextType>({
  state: { cart: [] },
  dispatch: () => {},
})

// initialize state
const initailState: State = {
  cart: [],
}

function ShopingCartContextProvider({ children }: Props) {
  // create reducer
  const reducers = (state: State, action: Action) => {
    switch (action.type) {
      case 'ADD_TO_CART':
        const { productData } = action.payload
        const { cart } = state
        const newCart = [...cart, productData]
        return { ...state, cart: newCart }
      default:
        return state
    }
  }

  const [state, dispatch] = useReducer(reducers, initailState)

  return (
    <ShoppingCartContext.Provider value={{ state, dispatch }}>
      {children}
    </ShoppingCartContext.Provider>
  )
}
export { ShoppingCartContext, ShopingCartContextProvider }
