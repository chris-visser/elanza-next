import { useState } from 'react'
import { Button } from '~/components/Button'

const statusMap = {
    idle: 'Submit',
    loading: 'Saving',
    error: 'Error occurred',
    success: 'Info sent!'
}

export const ApplyToRequestAction: React.FC<{ id: string }> = ({ id }) => {

    const [status, setStatus] = useState<keyof typeof statusMap>('idle')

    const handleApply = async () => {
        fetch(
            `/api/care-requests/${id}/apply`,
            {
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
                if(response?.status !== 200) {
                    setStatus('error')
                } else {
                    setStatus('success')
                    // UX experience and testing resulted in a 2300ms timeout until form reset on success
                    setTimeout(() => setStatus('idle'), 2300)
                }
            })
    }

    if(status === 'error') {
        return (
            <span>
                Some error occurred
            </span>
        )
    }

    if(status === 'loading') {
        return (
            <span>
                Applying...
            </span>
        )
    }

    if(status === 'success') {
        return (
            <span>Succesfully applied!</span>
        )
    }

    return (
        <Button variant="primary" onClick={handleApply}>Apply</Button>
    )
}