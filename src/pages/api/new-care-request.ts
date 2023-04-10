// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { nanoid } from 'nanoid'
import { CareRequestSchema, CareRequestData  } from '~/schemas/CareRequestSchema'

import { careRequests } from '~/data/careRequests'

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<CareRequestData | { error: string }>
) {

  try {
    const info = CareRequestSchema.parse(req.body)

    careRequests.push({
      id: nanoid(),
      ...info
    })

    res.status(201).json(info)
    // Not sure how to type. should be ApiError
    // TODO find proper typing?
  } catch(err: any) {
    console.error(err.toString())
    res.status(400).json({
      error: err
    })
  }
}
