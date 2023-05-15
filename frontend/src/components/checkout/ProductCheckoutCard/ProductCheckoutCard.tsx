import styles from './product-checkout-card.module.scss'
import Image from 'next/image'
import { ShoppingCartProduct } from '@/types/types'

interface Props {
  product: ShoppingCartProduct
}

function ProductCheckoutCard({ product }: Props): JSX.Element {
  return (
    <div className={styles.productCheckoutCard}>
      <Image
        src={product.imageUrl}
        alt={product.name}
        width={100}
        height={100}
      />
      <div className={styles.productInfoContainer}>
        <h2 className={styles.productName}>{product.name}</h2>
        <p className={styles.productQuantity}>Quantity: {product.quantity}</p>
        <p className={styles.productPrice}>Price: ${product.price}</p>
      </div>
    </div>
  )
}

export default ProductCheckoutCard
