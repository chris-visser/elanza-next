import type { NextApiRequest, NextApiResponse } from 'next'
import { CareRequestData } from '~/schemas/CareRequestSchema'
import { careRequests } from '~/data/careRequests'

type ResponseBody = {
    pagination: {
        totalRecords: number
    }
    data: CareRequestData[]
}

export default function handler(
    req: NextApiRequest,
    res: NextApiResponse<ResponseBody>
) {
    res.status(200).json({
        pagination: {
            totalRecords: careRequests.length
        },
        data: careRequests.filter(({ status }) => status !== 'closed')
    })
}
