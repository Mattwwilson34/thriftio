import styles from './cart-items.module.scss'
import CartItem from '../CartItem/CartItem'
import { Product } from '@/types/types'

interface CartItemsProps {
  cartItems: Product[]
}

function CartItems({ cartItems }: CartItemsProps) {
  return (
    <ul className={styles.cartItems}>
      {cartItems.map((cartItem) => {
        return <CartItem key={cartItem.uuid} product={cartItem} />
      })}
    </ul>
  )
}

export default CartItems
