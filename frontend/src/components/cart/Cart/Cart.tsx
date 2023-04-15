import styles from './cart.module.scss'
import Image from 'next/image'
import shoppingCartIcon from '../../../../public/icons/shopping-cart.svg'

function Cart() {
  return (
    <>
      <Image src={shoppingCartIcon} alt="Shopping cart icon" className={styles.shoppingCartIcon} />
      <span className={styles.shoppingCartNumber}>0</span>
      <span className={styles.shoppingCartLabel}>cart</span>
    </>
  )
}

export default Cart
