import styles from './product-id.module.scss'
import Image from 'next/image'
import { Product } from '@/types/types'
import { GetStaticPropsContext } from 'next'

interface ProductDetailPageProps {
  productData: Product
}

function ProductDetailPage({ productData }: ProductDetailPageProps) {
  const { name, price, imageUrl, description } = productData
  return (
    <main>
      <section className={styles.productSection}>
        <h1 className={styles.productName}>{name}</h1>
        <Image src={imageUrl} alt={name} class={styles.productImage} height={300} width={300} />
        <div className={styles.productPrice}>{price}</div>
        <button type='button' className={styles.addToCardButton}>Add To Card</button>
        <h2 className={styles.productDescriptionHeader}>Description</h2>
        <p className={styles.productDescription}>{description}</p>
      </section>
    </main>
  )
}

export async function getStaticPaths() {
  // call API endpoint to get all product IDs
  const response = await fetch('http://localhost:3001/api/products/productIds')
  const productIdsStringArray = await response.json()

  // create an array of paths with params (id)
  const paths = productIdsStringArray.map((productId: string) => ({
    params: {
      productId: productId,
    },
  }))

  return { paths, fallback: false }
}

export async function getStaticProps(context: GetStaticPropsContext) {
  // get product id from url params
  const productId = context?.params?.productId

  // get product data from db uding id and nextjs api
  const productDataJson = await fetch(
    `http://localhost:3001/api/products/${productId}`
  )
  // conver form json
  const productData = await productDataJson.json()

  return {
    props: {
      productData,
    },
  }
}

export default ProductDetailPage
