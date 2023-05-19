import { useState, useEffect } from 'react'
import styles from './search-bar.module.scss'
import Image from 'next/image'
import Link from 'next/link'
import searchIcon from '../../../../public/icons/search-icon.svg'

interface SearchResults {
  uuid: string
  name: string
}

function SearchBar() {
  const [searchText, setSearchText] = useState<string>('')
  const [searchResults, setSearchResults] = useState<SearchResults[]>([])

  useEffect(() => {
    // databse query function
    async function dbProductQuery(searchText: string) {
      const queryURL = `http://localhost:3000/api/product-search?search=${searchText}`
      try {
        // include credentials to send cookies
        const response = await fetch(queryURL, {
          credentials: 'include',
        })
        const productData = await response.json()

        setSearchResults(productData)
      } catch (err) {
        if (err) console.log(err)
      }
    }

    // setup debounce for search
    const delay = 500
    const debounceTimer = setTimeout(() => {
      // handle empty search
      if (searchText === '') return
      // handle search
      console.log(`Search for ${searchText}`)
      dbProductQuery(searchText)
    }, delay)

    return () => {
      clearTimeout(debounceTimer)
    }
  }, [searchText])

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    // update text when input changes
    const { value } = e.target
    setSearchText(value)
  }

  function handleClick() {
    setSearchText('')
  }

  // search results boolean for displaying search suggestions
  const hasSearchResults = searchResults.length > 0 && searchText !== ''

  return (
    <div className={styles.searchContainer}>
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
      {hasSearchResults && (
        <div className={styles.searchSuggestionsContainer}>
          <ul className={styles.searchSuggestions}>
            {searchResults.map((result) => {
              return (
                <li className={styles.searchResultListItem} key={result.uuid} onClick={handleClick}>
                  <Link href={`/products/${result.uuid}`}>{result.name}</Link>
                </li>
              )
            })}
          </ul>
        </div>
      )}
    </div>
  )
}

export default SearchBar
