import { useContext } from 'react'
import { ShoppingCartContext } from '@/context/ShoppingCartContext'
import {CartItems, CartTotal} from '@/components/cart/'
import styles from './cart.module.scss'

function CartPage() { 
  const { state } = useContext(ShoppingCartContext)
  const { shoppingCart } = state

  return (
    <div className={styles.cartContainer}>
      <CartItems cartItems={shoppingCart} />
      <CartTotal cartItems={shoppingCart} />
    </div>
  )
}

export default CartPage
