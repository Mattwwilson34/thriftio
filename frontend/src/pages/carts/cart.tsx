import { useContext } from 'react'
import { useRouter } from 'next/router'
import { ShoppingCartContext } from '@/context/ShoppingCartContext'
import { CartItems, CartTotal } from '@/components/cart/'
import styles from './cart.module.scss'

function CartPage() {
  const router = useRouter()
  const { state } = useContext(ShoppingCartContext)
  const { shoppingCart } = state

  const cartCount = shoppingCart.length

  // redirect to home page on button click
  const handleContinueShopping = () => router.push('/')

  // redirect to checkout on button click
  const handleCheckout = () => router.push('/checkout/checkout')

  return (
    <div className={styles.cartContainer}>
      {/* empty cart message */}
      {cartCount === 0 && (
        <>
          <h1 className={styles.emptyCart}>Your cart is empty.</h1>
          <button className={styles.continueShoppingBtn} onClick={handleContinueShopping}>
            Continue Shopping
          </button>
        </>
      )}
      {/* cart not empty display cart */}
      {cartCount > 0 && (
        <>
          <CartItems cartItems={shoppingCart} />
          <CartTotal cartItems={shoppingCart} />
          <button className={styles.checkoutBtn} onClick={handleCheckout}>Checkout</button>
        </>
      )}
    </div>
  )
}

export default CartPage
