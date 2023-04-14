import { forwardRef } from 'react'
import Image from 'next/image'
import styles from './product-card.module.scss'
import { Product } from '@/types/types'

interface ProductCardProps {
  productData: Product
}

const ProductCard = forwardRef(
  ({ productData }: ProductCardProps, ref): JSX.Element => {
    const { name, price, imageUrl } = productData

    return (
      <article className={styles.productCard} ref={ref}>
        <h1 className={styles.productName}>{name}</h1>
        <Image
          className={styles.productImage}
          src={imageUrl}
          alt={name}
          width={100}
          height={100}
        />
        <div className={styles.productPrice}>{price}</div>
        <button type="button" className={styles.addToCardButton}>
          Add To Cart
        </button>
      </article>
    )
  }
)

export default ProductCard
