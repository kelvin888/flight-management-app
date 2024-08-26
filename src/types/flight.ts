
export type FlightType = {
    id: string
    code: string
    capacity: number
    departureDate: string
    status: string
    img: string
    action: string
}

export type GetFlightsResponse = {
    data: {
        count: number,
        resources: FlightType[],
        total: number
    };
}


