import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { z } from 'zod'

import { CareRequestSchema, CareRequestData } from '~/schemas/CareRequestSchema';
import { Button } from '~/components/Button';


const statusMap = {
    idle: 'Submit',
    loading: 'Saving',
    error: 'Error occurred',
    success: 'Info sent!'
}

export default function CareRequest() {

    const [status, setStatus] = useState<keyof typeof statusMap>('idle')

    const { register, handleSubmit, formState: { errors } } = useForm<CareRequestData>({
        resolver: zodResolver(CareRequestSchema),
    });

    const onSubmit = async (data: CareRequestData) => {
        fetch(
            `/api/new-care-request`,
            {
                body: JSON.stringify(data),
                headers: {
                    'Content-Type': 'application/json',
                },
                method: 'POST'
            }
        )
            .catch(e => {
                setStatus('error')
            })
            .then((response) => {
                if(response?.status !== 201) {
                    setStatus('error')
                } else {
                    setStatus('success')
                    // UX experience and testing resulted in a 2300ms timeout until form reset on success
                    setTimeout(() => setStatus('idle'), 2300)
                }
            })
    }

    return (
        <main className="px-24 w-full max-w-[1200px]">
            <header className="flex text-center flex-col items-center justify-center min-h-[200px]">
                <h1 className="text-4xl font-bold">New Care Request</h1>
            </header>

            <form onSubmit={handleSubmit(onSubmit)} className="max-w-lg mx-auto">
                <div className="mb-4">
                    <label htmlFor="kindOfCare" className="block font-medium mb-1">
                        Kind of Care Needed
                    </label>
                    <select
                        id="kindOfCare"
                        defaultValue="household"
                        {...register('kindOfCare')}
                        className="w-full py-2 px-3 border border-gray-400 rounded-md"
                    >
                        <option value="">Select an option</option>
                        <option value="household">Household</option>
                        <option value="medical">Medical</option>
                    </select>
                    {errors.kindOfCare && (
                        <span className="text-red-500">{errors.kindOfCare.message}</span>
                    )}
                </div>
                <div className="mb-4">
                    <label htmlFor="startDate" className="block font-medium mb-1">
                        Start Date and Time
                    </label>
                    <input
                        type="datetime-local"
                        id="startsAt"
                        defaultValue="2023-07-04T08:00"
                        {...register('startsAt')}
                        className="w-full py-2 px-3 border border-gray-400 rounded-md"
                    />
                    {errors.startsAt && (
                        <span className="text-red-500">{errors.startsAt.message}</span>
                    )}
                </div>
                <div className="mb-4">
                    <label htmlFor="endsAt" className="block font-medium mb-1">
                        End date and time
                    </label>
                    <input
                        type="datetime-local"
                        id="endsAt"
                        defaultValue="2023-07-04T09:00"
                        {...register('endsAt')}
                        className="w-full py-2 px-3 border border-gray-400 rounded-md"
                    />
                    {errors.endsAt && (
                        <span className="text-red-500">{errors.endsAt.message}</span>
                    )}
                </div>

                <div className="mb-4">
                    <label htmlFor="clientName" className="block font-medium mb-1">
                        Your name
                    </label>
                    <input
                        type="text"
                        id="clientName"
                        defaultValue="Chris Visser"
                        {...register('clientName')}
                        className="w-full py-2 px-3 border border-gray-400 rounded-md"
                    />
                    {errors.clientName && (
                        <span className="text-red-500">{errors.clientName.message}</span>
                    )}
                </div>

                <div className="mb-4">
                    <label htmlFor="extraInformation" className="block font-medium mb-1">
                        Extra Information
                    </label>
                    <textarea
                        id="extraInformation"
                        defaultValue="Wow this works!"
                        {...register('extraInformation')}
                        className="w-full py-2 px-3 border border-gray-400 rounded-md"
                    />
                    {errors.extraInformation && (
                        <span className="text-red-500">{errors.extraInformation.message}</span>
                    )}
                </div>

                <Button type="submit">
                    {statusMap[status]}
                </Button>
                {status === 'success' && (
                    <p className="text-green-600 text-lg mt-2">Form successfully sent. Check overview</p>
                )}
                {status === 'error' && (
                    <p className="text-red-600 text-lg mt-2">Some error occurred</p>
                )}
            </form>
        </main>
    )
}