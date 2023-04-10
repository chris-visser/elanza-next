import type { NextApiRequest, NextApiResponse } from 'next'
import { CareRequestRecord } from '~/schemas/CareRequestSchema'
import { careRequests } from '~/data/careRequests'

export default function handler(
    req: NextApiRequest,
    res: NextApiResponse<CareRequestRecord>
) {

    const record = careRequests.find(({ id }) => id === req.query.id)
    
    if(!record) {
        return res.status(404)
    }

    res.status(200).json(record)
}
