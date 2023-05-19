import { useState, useEffect } from 'react'
import styles from './search-bar.module.scss'
import Image from 'next/image'
import searchIcon from '../../../../public/icons/search-icon.svg'

function SearchBar() {
  const [searchText, setSearchText] = useState<string>('')

  useEffect(() => {
    // setup debounce for search
    const delay = 500
    const debounceTimer = setTimeout(() => {
      console.log(`Search for ${searchText}`)
    }, delay)

    return () => {
      clearTimeout(debounceTimer)
    }
    
  },[searchText])

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    // update text when input changes
    const { value } = e.target
    setSearchText(value)

  }

  return (
    <div className={styles.searchBar}>
      <label htmlFor="searchInput" className={styles.searchLabel}>
        <input
          className={styles.searchInput}
          type="text"
          placeholder="Search thrift.io"
          onChange={handleChange}
          value={searchText}
        />
      </label>
      <label htmlFor="categorySelector" className={styles.categoryLabel}>
        <select className={styles.categorySelector}>
          <option value="All Categories">All Categories</option>
        </select>
      </label>
      <div className={styles.spacer}></div>
      <div className={styles.searchButton}>
        <Image src={searchIcon} alt="search-icon" />
      </div>
    </div>
  )
}

export default SearchBar
