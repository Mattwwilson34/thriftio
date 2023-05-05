import { useContext, useEffect } from 'react'
import styles from './cart.module.scss'
import Image from 'next/image'
import Link from 'next/link'
import shoppingCartIcon from '../../../../public/icons/shopping-cart.svg'
import { ShoppingCartContext } from '@/context/ShoppingCartContext'

function Cart() {
  const { state, dispatch } = useContext(ShoppingCartContext)

  // create a use effect that runs once on mount and dispatches the action to get the cart from the server
  useEffect(() => {
    // check if shopping cart session is on server
    async function checkForCart() {
      const response = await fetch('/api/shopping-cart/get-session-cart', {
        method: 'GET',
        credentials: 'include',
      })
      const shoppingCart = await response.json()

      if (shoppingCart) {
        dispatch({
          type: 'GET_CART',
          payload: { shoppingCart },
        })
      }
    }
    checkForCart()
  }, [])

  const { shoppingCart } = state
  const numberOfItemsInCart = shoppingCart.reduce((prev, curr) => prev + curr.quantity, 0)

  return (
    <>
      <Link href="/carts/cart">
        <Image
          src={shoppingCartIcon}
          alt="Shopping cart icon"
          className={styles.shoppingCartIcon}
        />
      </Link>
      <span className={styles.shoppingCartNumber}>{numberOfItemsInCart}</span>
      <span className={styles.shoppingCartLabel}>cart</span>
    </>
  )
}

export default Cart
