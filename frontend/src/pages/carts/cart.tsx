import { useContext } from 'react'
import { ShoppingCartContext } from '@/context/ShoppingCartContext'
import {CartItems, CartTotal} from '@/components/cart/'
import styles from './cart.module.scss'

function CartPage() { 
  const { state } = useContext(ShoppingCartContext)
  const { shoppingCart } = state

  const cartCount = shoppingCart.length
  return (
    <div className={styles.cartContainer}>
      <CartItems cartItems={shoppingCart} />
      <CartTotal cartItems={shoppingCart} />
      {/* empty cart message */}
      {cartCount === 0 && (
        <>
          <h1 className={styles.emptyCart}>Your cart is empty.</h1>
        </>
      )}
      {/* cart not empty display cart */}
      {cartCount > 0 && (
        <>
          <CartItems cartItems={shoppingCart} />
          <CartTotal cartItems={shoppingCart} />
        </>
      )}
    </div>
  )
}

export default CartPage
