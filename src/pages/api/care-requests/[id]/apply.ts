// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { nanoid } from 'nanoid'
import { CareRequestSchema, CareRequestData } from '~/schemas/CareRequestSchema'

import { careRequests } from '~/data/careRequests'

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<CareRequestData | { error: string }>
) {

  const index = careRequests.findIndex(({ id }) => id === req.query.id)

  if (index === -1) {
    return res.status(404)
  }

  careRequests[index] = {
    ...careRequests[index],
    status: 'closed'
  }

  res.status(200).json(careRequests[index])
}
