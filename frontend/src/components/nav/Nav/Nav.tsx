import styles from './nav.module.scss'

function Nav(): JSX.Element {
  return (
    <nav className={styles.nav}>
      <header>
        <h1 className={styles.header}>thrift<span className={styles.headerInterpunct}>.</span>io</h1>
      </header>
    </nav>
  )
}

export default Nav
