function ProductDetailPage(props) {
  return <h1>The Product Detail Page {props.productId}</h1>
}

export async function getStaticPaths() {
  // call API endpoint to get all product IDs
  const response = await fetch('http://localhost:3001/api/productIds')
  const productIdsStringArray = await response.json()

  // create an array of paths with params (id)
  const paths = productIdsStringArray.map((productId) => ({
    params: {
      productId: productId,
    },
  }))

  return { paths, fallback: false }
}

export async function getStaticProps(context) {
  //
  //todo: fetch product data from API
  //
  const productId = context.params.productId
  return {
    props: {
      productId,
    },
  }
}

export default ProductDetailPage
