import { Product, ShoppingCartProduct } from '@/types/types'
import React, { ReactNode, createContext, useReducer } from 'react'

interface Props {
  children: ReactNode
}

interface Action {
  type: string
  payload?: any
}

interface State {
  shoppingCart: ShoppingCartProduct[] | []
}

interface ShoppingCartContextType {
  state: State
  dispatch: React.Dispatch<Action>
}

// create shopping cart context
const ShoppingCartContext = createContext<ShoppingCartContextType>({
  state: { shoppingCart: [] },
  dispatch: () => {},
})

// initialize state
const initailState: State = {
  shoppingCart: [],
}

// update shopping cart session on server
async function updateCart(cart: Product[]) {
  await fetch('/api/shopping-cart-session-update', {
    method: 'POST',
    credentials: 'include',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(cart),
  })
}

function ShopingCartContextProvider({ children }: Props) {
  // create reducer
  const reducers = (state: State, action: Action) => {
    // create new cart array
    let newCart = [...state.shoppingCart]

    switch (action.type) {
      // get cart from session
      case 'GET_CART':
        const { shoppingCart } = action.payload
        newCart = [...shoppingCart]
        return { ...state, shoppingCart: newCart }

      // add product to cart from a product card
      case 'ADD_TO_CART':
        const { productData } = action.payload
        const productInCart = newCart.find((item) => item.uuid === productData.uuid)
        
        // handle product already in cart
        // must update cart product not productData
        // productData does not have quantity value
        if (productInCart) {
          productInCart.quantity += 1
        } 
        // handle product not in cart
        else {
          productData.quantity = 1
          newCart = [...newCart, productData]
        }
        updateCart(newCart)
        return { ...state, shoppingCart: newCart }

      // remove product from cart from the shopping cart page
      case 'REMOVE_FROM_CART':
        const { uuid: uuidToRemove } = action.payload.productToRemove
        newCart = newCart.filter((item) => item.uuid !== uuidToRemove)
        updateCart(newCart)
        return { ...state, shoppingCart: newCart }

      // update product quantity in cart from the shopping cart page
      case 'UPDATE_CART_QUANTITY':
        const { uuid, quantity } = action.payload.updatedProduct
        const productToUpdateIndex = newCart.findIndex(
          (item) => item.uuid === uuid
        )
        if (productToUpdateIndex !== -1) {
          newCart[productToUpdateIndex].quantity = quantity
          updateCart(newCart)
          return { ...state, shoppingCart: newCart }
        } else {
          console.log('product not found')
          return state
        }

      // clear cart
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
