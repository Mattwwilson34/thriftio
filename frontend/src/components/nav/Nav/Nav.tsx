import styles from './nav.module.scss'
import SearchBar from '@/components/search-bar'
import { Cart } from '@/components/cart'

function Nav(): JSX.Element {
  return (
    <nav className={styles.nav}>
      <header>
        <h1 className={styles.header}>
          <a href="http://localhost:3001">
          thrift<span className={styles.headerInterpunct}>.</span>io
          </a>
        </h1>
      </header>
        <SearchBar />
      <div className={styles.cartContainer}>
        <Cart />
      </div>
    </nav>
  )
}

export default Nav
