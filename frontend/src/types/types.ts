// create a type for db product data
export type Product = {
  uuid: string
  url: string
  imageUrl: string
  name: string
  description: string
  price: number
  brand: string
  available: boolean
}
