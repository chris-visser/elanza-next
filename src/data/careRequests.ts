import { CareRequestData } from "~/schemas/CareRequestSchema";

type CareRequestRecord = {
    id: string
} & CareRequestData

export const careRequests: CareRequestRecord[] = [
    {
        "id": "isjdf9ivmoifmaew0",
        "kindOfCare": "household",
        "startsAt": "2023-07-04T08:00",
        "endsAt": "2023-07-04T09:00",
        "clientName": "Chris Visser",
        "extraInformation": "Wow this works!"
    }
]