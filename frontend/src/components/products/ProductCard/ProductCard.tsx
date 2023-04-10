import Image from 'next/image'
import styles from './product-card.module.scss'
import {Product} from '@/types/types'

interface ProductCardProps {
  productData: Product
}


function ProductCard({productData}: ProductCardProps): JSX.Element {
  const {name, price, description, imageUrl} = productData

  return (
    <article className={styles.productCard}>
      <h1 className={styles.productName}>{name}</h1>
      <Image className={styles.productImage} src={imageUrl} alt={name} width={300} height={300} />
      <div className={styles.productPrice}>{price}</div>
      <p className={styles.productDescription}>{description}</p>
    </article>
  )
}

export default ProductCard
