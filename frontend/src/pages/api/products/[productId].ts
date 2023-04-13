import type { NextApiRequest, NextApiResponse } from 'next'

// create a type for the error response
type ErrorResponse = {
  error: {
    message: string
  }
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<String[] | ErrorResponse>
) {
  try {
    const {productId} = req.query
    // define the API url
    const productDataUrl = `http://localhost:3000/api/product/${productId}`

    // fetch the data from the API
    const response = await fetch(productDataUrl)

    if (!response.ok) {
      throw new Error('Network response was not ok')
    }
    const productData: String[] = await response.json()
    // if the data is fetched successfully, return the data
    res.send(productData)
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

