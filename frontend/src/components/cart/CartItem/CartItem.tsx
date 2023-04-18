import styles from './cart-item.module.scss'
import Image from 'next/image'
import { Product } from '@/types/types'

interface CartItemProps {
  product: Product
}

function CartItem({ product }: CartItemProps) {
  const { name, price, imageUrl} = product
  return (
    <li className={styles.cartItem}>
      <input  type="checkbox" />
      <Image src={imageUrl} alt={name} width={100} height={100} />
      <h1>{name}</h1>
      <span>{price}</span>
    </li>
  )
}

export default CartItem
