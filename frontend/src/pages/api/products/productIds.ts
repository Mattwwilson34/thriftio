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
    // define the API url
    const productIdsApiUrl = 'http://localhost:3000/api/productIds'

    // fetch the data from the API
    const response = await fetch(productIdsApiUrl)

    if (!response.ok) {
      throw new Error('Network response was not ok')
    }
    const productIds: String[] = await response.json()
    // if the data is fetched successfully, return the data
    res.send(productIds)
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
