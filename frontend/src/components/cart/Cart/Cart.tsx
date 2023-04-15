import { useContext } from 'react'
import styles from './cart.module.scss'
import Image from 'next/image'
import shoppingCartIcon from '../../../../public/icons/shopping-cart.svg'
import { ShoppingCartContext } from '@/context/ShoppingCartContext'

function Cart() {
  const { state } = useContext(ShoppingCartContext)
  const { cart } = state
  const numberOfItemsInCart = cart.length

  return (
    <>
      <Image
        src={shoppingCartIcon}
        alt="Shopping cart icon"
        className={styles.shoppingCartIcon}
      />
      <span className={styles.shoppingCartNumber}>{numberOfItemsInCart}</span>
      <span className={styles.shoppingCartLabel}>cart</span>
    </>
  )
}

export default Cart
