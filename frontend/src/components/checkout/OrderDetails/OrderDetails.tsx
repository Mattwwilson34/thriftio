import { useContext } from 'react'
import styles from './order-details.module.scss'
import { ShoppingCartContext } from '@/context/ShoppingCartContext'
import { ShoppingCartProduct } from '@/types/types'

function OrderDetails() {
  // shopping cart context
  const { state } = useContext(ShoppingCartContext)
  // had to use the any[] type due to a known TS bug preventing
  // the use of use reducer on this particular reducer state
  // TODO: fix this
  const shoppingCart: any[] = state.shoppingCart

  // get total price of items in cart
  const cartTotal = shoppingCart
    .reduce(
      (acc: number, item: ShoppingCartProduct) =>
        acc + item.price * item.quantity,
      0
    )
    .toFixed(2)

  // get total number of items in cart
  const numOfCartItems = shoppingCart.reduce(
    (acc: number, item: ShoppingCartProduct) => acc + item.quantity,
    0
  )

  return (
    <div className={styles.orderDetails}>
      <button className={styles.placeOrderButton}> Place your order </button>
      <hr />
      <h2 className={styles.orderDetailsHeader}>Oder Summary</h2>
      <div className={styles.orderDetailsGrid}>
        <p>Items ({numOfCartItems}):</p>
        <p className={styles.alignRight}>${cartTotal}</p>
        <p>Shipping & Handling:</p>
        <p className={styles.alignRight}>$0.00</p>
        <hr className={styles.salesTaxDivider} />
        <p>Total before tax:</p>
        <p className={styles.alignRight}>${cartTotal}</p>
        <p>Estimated tax to be collected:</p>
        <p className={styles.alignRight}>$0.00</p>
        <hr className={styles.orderTotalDivider}/>
        <h2 className={styles.orderTotalHeader}>Order Total:</h2>
        <p className={styles.alignRight}>${cartTotal}</p>
      </div>
    </div>
  )
}

export default OrderDetails
