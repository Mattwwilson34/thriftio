import type { NextApiRequest, NextApiResponse } from 'next'

// create a type for the error response
type ErrorResponse = {
  error: {
    message: string
  }
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const response = await fetch('http://localhost:3000/api/cart', {
      method: 'GET',
      credentials: 'include',
      headers: {
        Cookie: req.headers.cookie ?? '',
      },
    })

    // get cookie header from the response
    const setCookieHeader = response.headers.get('set-cookie')

    // set the cookie on browser
    // this cookie had to be set manually
    // due to nextJS sever not forwording it to the browser
    res.setHeader('Set-Cookie', setCookieHeader)


    const shoppingCartSessionData = await response.json()
    res.send(JSON.stringify(shoppingCartSessionData))
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
