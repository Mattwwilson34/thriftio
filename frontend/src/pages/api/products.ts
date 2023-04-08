import type { NextApiRequest, NextApiResponse } from 'next'

// create a type for the product data
type ProductData = {
  uuId: string
  url: string
  name: string
  description: string
  price: number
  brand: string
  available: boolean
}

// create a type for the error response
type ErrorResponse = {
  error: {
    message: string
  }
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ProductData | ErrorResponse>
) {
  try {
    // fetch the data from the API
    const response = await fetch('http://localhost:3000/api/products')
    if (!response.ok) {
      throw new Error('Network response was not ok')
    }
    const data: ProductData = await response.json()
    // if the data is fetched successfully, return the data
    res.status(200).json(data)
  } catch (error: any) {
    const errorResponse: ErrorResponse = {
      error: {
        message: error.message,
      },
    }
    // if there is an error, return the error message
    res.status(500).json(errorResponse)
  }
}
