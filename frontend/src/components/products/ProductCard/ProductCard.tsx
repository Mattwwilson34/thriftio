import styles from './product-card.module.scss'
import {Product} from '@/types/types'

interface ProductCardProps {
  productData: Product
}


function ProductCard({productData}: ProductCardProps): JSX.Element {

  console.log(productData)
  const {name, price, description} = productData
  return (
    <div className={styles.productCard}>
      <h1 className={styles.productName}>{name}</h1>
      <div className={styles.productPrice}>{price}</div>
      <p className={styles.productDescription}>{description}</p>
    </div>
  )
}

export default ProductCard
