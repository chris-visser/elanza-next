import { useEffect, useState } from 'react'
import Link from 'next/link'
import { CareRequestRecord } from '~/schemas/CareRequestSchema'
import { CareRequestItem } from '~/containers/CareRequestItem'

export default function Home() {
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [careRequests, setCareRequests] = useState<CareRequestRecord[]>([])

  useEffect(() => {

    fetch('/api/care-requests').then(response => (
      response.json()
    ))
      .then(info => {
        setCareRequests(info.data)
      })
  }, [])

  return (
    <main className="px-24 m-auto max-w-[1024px]">
      <header className="flex text-center flex-col items-center justify-center min-h-[200px]">
        <h1 className="text-4xl font-bold block mb-8">Healthcare marketplace</h1>
        <Link href="/new-care-request" className="text-semibold text-blue-500 hover:text-blue-700 hover:underline active:text-blue-400">
          Create Care Request
        </Link>
      </header>

      <section className="flex justify-center">
        <ul className="w-full max-w-[400px]">
          {careRequests.map(item => <CareRequestItem {...item} key={item.id} />)}
        </ul>
      </section>
    </main>
  )
}
