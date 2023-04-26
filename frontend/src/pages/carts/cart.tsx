import { useContext } from 'react'
import { ShoppingCartContext } from '@/context/ShoppingCartContext'
import {CartItems} from '@/components/cart/'

function CartPage() { 
  const { state } = useContext(ShoppingCartContext)
  const { cart } = state

  return (
    <div>
      <CartItems cartItems={cart} />
    </div>
  )
}

export default CartPage
