import { useContext } from 'react'
import { ShoppingCartContext } from '@/context/ShoppingCartContext'

function CartPage() { 
  const { state } = useContext(ShoppingCartContext)
  const { cart } = state
  console.log(cart)

  return (
    <div>
      <h1>Cart</h1>
    </div>
  )
}

export default CartPage
