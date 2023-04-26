import styles from './cart-item.module.scss'
import Link from 'next/link'
import Image from 'next/image'
import { Product } from '@/types/types'

interface CartItemProps {
  product: Product
}

function CartItem({ product }: CartItemProps) {
  const { name, price, imageUrl } = product
  return (
    <li className={styles.cartItem}>
      <input type="checkbox" className={styles.productCheckbox}/>
      <Image src={imageUrl} alt={name} width={100} height={100} />
      <div className={styles.cartItemInfoContainer}>
        <h1 className={styles.productName}>{name}</h1>
        <span className={styles.price}>{price}</span>
        <span className={styles.inStock}>In Stock</span>
        <div className={styles.cartItemInputContainer}>
          <span> Qty: </span>
          <input
            className={styles.cartItemQuantity}
            type="number"
            name="cartItemQuantity"
            min="0"
            max="100"
            defaultValue="1"
          />
          <Link href="/">Delete</Link>
        </div>
      </div>
    </li>
  )
}

export default CartItem
