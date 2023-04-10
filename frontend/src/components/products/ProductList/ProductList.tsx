import styles from './product-list.module.scss'
import ProductCard from '../ProductCard/ProductCard'
import { Product } from '@/types/types'

interface ProductListProps {
  products: Product[]
}

function ProductList({ products }: ProductListProps): JSX.Element {
  return (
    <section className={styles.productList}>
      {products.map((product) => {
        return <ProductCard key={product.uuid} productData={product} />
      })}
    </section>
  )
}

export default ProductList
