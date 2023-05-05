import React, { useContext, forwardRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import styles from './product-card.module.scss'
import { Product } from '@/types/types'
import { ShoppingCartContext } from '@/context/ShoppingCartContext'

interface ProductCardProps {}

const ProductCard = forwardRef(
  ({ productData }: ProductCardProps, ref): JSX.Element => {
    // shpping cart context
    const { dispatch } = useContext(ShoppingCartContext)

    function handleClickAddToCart() {
      dispatch({
        type: 'ADD_TO_CART',
        payload: { productData },
      })
    }

    const { name, price, imageUrl } = productData

    return (
      <article className={styles.productCard} ref={ref}>
        <Link href={`/products/${productData.uuid}`} className={styles.productCardLink}>
        <Image
          className={styles.productImage}
          src={imageUrl}
          alt={name}
          width={150}
          height={150}
        />
          <h1 className={styles.productName}>{name}</h1>
        <div className={styles.productPrice}>{price}</div>
        </Link>
        <button
          type="button"
          className={styles.addToCardButton}
          onClick={handleClickAddToCart}
        >
          Add To Cart
        </button>
      </article>
    )
  }
)

export default ProductCard
