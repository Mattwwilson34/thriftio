import { useRouter } from 'next/router'

function ProductDetailPage() {
  const router = useRouter()

  const productId = router.query.productId

  return <h1>The Product Detail Page {productId}</h1>
}

export default ProductDetailPage
