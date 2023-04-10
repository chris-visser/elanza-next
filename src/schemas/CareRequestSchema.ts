import { z } from 'zod';

export const CareRequestSchema = z.object({
    kindOfCare: z.enum(['household', 'medical']),
    startsAt: z.string(),
    endsAt: z.string(),
    clientName: z.string().nonempty(),
    extraInformation: z.string().optional(),
    status: z.enum(['open', 'closed']).optional(),
});

export type CareRequestData = z.TypeOf<typeof CareRequestSchema>

export type CareRequestRecord = {
    id: string
} & CareRequestData
