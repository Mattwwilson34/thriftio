import { useState, useEffect, useRef } from 'react'
import type { Product } from '@/types/types'
import { ProductList } from '@/components/products'

function ProductsInfinitScroll(): JSX.Element {
  const [products, setProducts] = useState<Product[] | []>([])
  const [paginationCursor, setPaginationCursor] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)
  const lastProductRef = useRef<HTMLDivElement>(null)
  const observer = useRef<IntersectionObserver | null>(null)

  useEffect(() => {
    // fetch products if there are none
    if (products.length === 0) {
      fetchProducts()
    }

    // remove old observer
    if (observer.current) {
      observer.current.disconnect()
    }

    // create new observer and observe the last product
    if (lastProductRef.current) {
      observer.current = new IntersectionObserver((entries) => {
        entries.forEach(async (entry) => {
          // if the last product is visible, fetch more products
          if (entry.isIntersecting) {
            await fetchProducts(paginationCursor)
          }
        })
      })
      // observe the last product
      observer.current.observe(lastProductRef.current)
    }
  }, [paginationCursor])

  // fetch products from the API
  async function fetchProducts(cursor: string | null = null) {
    const response = await fetch(`/api/products/paginatedProducts?cursor=${cursor}`)
    const productsData = await response.json()
    setProducts((prevProducts) => [...prevProducts, ...productsData.products])
    setPaginationCursor(productsData.cursor)
    setLoading(false)
  }

  return (
    <>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <ProductList ref={lastProductRef} products={products} />
      )}
    </>
  )
}

export default ProductsInfinitScroll
