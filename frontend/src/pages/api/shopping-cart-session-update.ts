import type { NextApiRequest, NextApiResponse } from 'next'
import cookie from 'cookie'

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
    console.log('line:17:', req.cookies)
    // POST shopping cart data to Express API
    const response = await fetch(
      'http://localhost:3000/api/shopping-cart-session-update',
      {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
          Cookie: req.headers.cookie ?? '',
        },
        body: JSON.stringify(req.body),
      }
    )

    // get cookie header from the response
    const setCookieHeader = response.headers.get('set-cookie')

    // set the cookie on browser
    // this cookie had to be set manually
    // due to nextJS sever not forwording it to the browser
    res.setHeader('Set-Cookie', setCookieHeader)
    //
    res.status(200).json({ message: 'Cookie set successfully' })
    //
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
