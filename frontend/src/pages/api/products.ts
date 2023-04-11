import type { NextApiRequest, NextApiResponse } from 'next'
import type { Product } from '@/types/types'

// create a type for the error response
type ErrorResponse = {
  error: {
    message: string
  }
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Product | ErrorResponse>
) {
  try {
    let productApiUrl = ''

    // handle pagination if paginationCursor is null
    const { cursor: paginationCursor } = req.query
    if (paginationCursor === 'null') {
      productApiUrl = `http://localhost:3000/api/products`
    } else {
      productApiUrl = `http://localhost:3000/api/products?cursor=${paginationCursor}`
    }

    // fetch the data from the API
    const response = await fetch(productApiUrl)
    if (!response.ok) {
      throw new Error('Network response was not ok')
    }
    const data: Product = await response.json()
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
