import format from 'date-fns/format'
import Link from 'next/link'
import { CareRequestRecord } from '~/schemas/CareRequestSchema'

const toDateTime = (dateStr: string) => format(new Date(dateStr), 'dd-MM-yyyy HH:mm')
const toTime = (dateStr: string) => format(new Date(dateStr), 'HH:mm')

const kindsOfCare = {
    household: 'Household',
    medical: 'Medical'
} 

export const CareRequestItem: React.FC<CareRequestRecord> = ({
    id,
    kindOfCare,
    clientName,
    startsAt,
    endsAt
}) => (
    <li className="p-4 relative mb-4">
        <p className="font-bold">
            <time dateTime={startsAt} className="font-bold">
                {toDateTime(startsAt)} - {toTime(endsAt)}
            </time>

        </p>

        <h3 className=" text-neutral-700 mb-2">
            <strong className="bold">{kindsOfCare[kindOfCare]}</strong> for {clientName}
        </h3>
        <Link href={`/care-requests/${id}`} className="text-blue-500 hover:underline absolute inset-0">
            <span className="absolute right-2 bottom-2">Details</span>
        </Link>
    </li>
)