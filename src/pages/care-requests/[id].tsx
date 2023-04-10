import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import format from 'date-fns/format'
import { CareRequestRecord } from '~/schemas/CareRequestSchema'
import { ApplyToRequestAction } from '~/containers/ApplyToRequestAction'

const toDateTime = (dateStr: string) => format(new Date(dateStr), 'dd-MM-yyyy HH:mm')
const toTime = (dateStr: string) => format(new Date(dateStr), 'HH:mm')

const kindsOfCare = {
  household: 'Household',
  medical: 'Medical'
}

export default function CareRequest() {
  const router = useRouter()
  const { id } = router.query

  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [careRequest, setCareRequest] = useState<CareRequestRecord>()

  useEffect(() => {
    setIsLoading(true)
    fetch(`/api/care-requests/${id}`).then(response => (
      response.json()
    ))
      .then(info => {
        setCareRequest(info)
        setIsLoading(false)
      })
      .catch(err => {
        setIsLoading(false)
      })
  }, [])

  if (!careRequest && isLoading) {
    return (
      <main className="px-24">
        <header className="flex text-center flex-col items-center justify-center min-h-[200px]">
          <h1 className="text-4xl font-bold block mb-8">
            Loading...
          </h1>
        </header>
      </main>
    )
  }

  if (!careRequest) {
    return (
      <main className="px-24">
        <header className="flex text-center flex-col items-center justify-center min-h-[200px]">
          <h1 className="text-4xl font-bold block mb-8">
            Care Request not found!
          </h1>
        </header>
      </main>
    )
  }

  const handleApply = () => {
    
  }

  return (
    <main className="px-24 m-auto max-w-[1024px]">
      <header className="relative flex text-center flex-col items-center justify-center min-h-[200px]">
        <h1 className="text-4xl font-bold block mb-8">
          {kindsOfCare[careRequest.kindOfCare]} for {careRequest.clientName}
        </h1>
        <time dateTime={careRequest.startsAt} className="font-bold">
          {toDateTime(careRequest.startsAt)} - {toTime(careRequest.endsAt)}
        </time>
        <div className="absolute top-12 right-2">
          <ApplyToRequestAction id={careRequest.id} />
        </div>
      </header>

      <section>
        <p>
          {careRequest.extraInformation}
        </p>
      </section>
    </main>
  )
}
