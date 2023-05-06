import {useContext, useState } from 'react'
import styles from './cart-item.module.scss'
import Link from 'next/link'
import Image from 'next/image'
import { ShoppingCartContext } from '@/context/ShoppingCartContext'
import { Product } from '@/types/types'

interface CartProduct extends Product {
  quantity: number
}

interface CartItemProps {
  product: CartProduct
}

function CartItem({ product }: CartItemProps) {
  const { dispatch } = useContext(ShoppingCartContext)
  const [productQuantity, setProductQuantity] = useState(product.quantity)
  const { name, price, imageUrl, quantity } = product

  function updateCartQuantity(): void {
    const updatedProduct = { ...product }
    updatedProduct.quantity = productQuantity
    dispatch({
      type: 'UPDATE_CART_QUANTITY',
      payload: { updatedProduct },
    })
  }
  
  function handleCartQuantityChange(e:React.ChangeEvent<HTMLInputElement>): void {
    const newQuantity = parseInt(e.target.value)
    if (newQuantity > 0) {
      setProductQuantity(newQuantity)
    } else {
      setProductQuantity(quantity)
    }
  }

  const quantityChanged = productQuantity !== quantity

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
            value={productQuantity}
            onChange={handleCartQuantityChange}
          />
          {quantityChanged && <button className={styles.quantityUpdated} onClick={updateCartQuantity}>Update Cart</button>}
          <Link href="/">Delete</Link>
        </div>
      </div>
    </li>
  )
}

export default CartItem
