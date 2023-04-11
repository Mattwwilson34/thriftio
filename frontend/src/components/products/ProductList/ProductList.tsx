import { forwardRef } from 'react'
import styles from './product-list.module.scss'
import ProductCard from '../ProductCard/ProductCard'
import { Product } from '@/types/types'

interface ProductListProps {
  products: Product[]
}

const ProductList = forwardRef(
  ({ products }: ProductListProps, ref): JSX.Element => {
    return (
      <section className={styles.productList}>
        {products.map((product, index) => {
          if (products.length === index + 1) {
            return (
              <ProductCard key={product.uuid} productData={product} ref={ref} />
            )
          } else {
            return <ProductCard key={product.uuid} productData={product} />
          }
        })}
      </section>
    )
  }
)

export default ProductList
