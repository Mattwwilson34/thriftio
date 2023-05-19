import styles from './search-bar.module.scss'
import Image from 'next/image'
import searchIcon from '../../../../public/icons/search-icon.svg'

function SearchBar() {
  return (
    <div className={styles.searchBar}>
      <label htmlFor="searchInput" className={styles.searchLabel}>
        <input
          className={styles.searchInput}
          type="text"
          placeholder="Search thrift.io"
        />
      </label>
      <label htmlFor="categorySelector" className={styles.categoryLabel}>
        <select className={styles.categorySelector}>
          <option value="All Categories">All Categories</option>
        </select>
      </label>
        <div className={styles.spacer}>
        </div>
      <div className={styles.searchButton}>
        <Image src={searchIcon} alt="search-icon" />
      </div>
    </div>
  )
}

export default SearchBar
