import styles from './cart-total.module.scss'
import { ShoppingCartProduct } from '@/types/types'

interface CartTotalProps {
  cartItems: ShoppingCartProduct[]
}

function CartTotal({ cartItems }: CartTotalProps) {
  const totalItems = cartItems.reduce((acc, item) => acc + item.quantity, 0)

  const subtotal = cartItems.reduce(
    (acc: number, item: ShoppingCartProduct) =>
      acc + item.price * item.quantity,
    0
  ).toFixed(2)
  return (
    <article className={styles.cartTotal}>
      <h2 className={styles.subtotal}>
        Subtotal<span>{` (${totalItems} items):`}</span>
        <span className={styles.subtotalValue}>{`${subtotal}`}</span>
      </h2>
    </article>
  )
}

export default CartTotal
