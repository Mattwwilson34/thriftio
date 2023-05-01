import { useContext } from 'react'
import { ShoppingCartContext } from '@/context/ShoppingCartContext'
import {CartItems} from '@/components/cart/'

function CartPage() { 
  const { state } = useContext(ShoppingCartContext)
  const { shoppingCart } = state

  return (
    <div>
      <CartItems cartItems={shoppingCart} />
    </div>
  )
}

export default CartPage
