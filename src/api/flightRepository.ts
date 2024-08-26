import { flightUrls } from "@/constants/apiUrls/flight";
import { get, post, httpDelete, put } from "./client/flight";
import {
  GetFlightsResponse,
} from "@/types/flight";
import { buildQueryString } from "@/utils/buildQueryParams";

export const flightRepository = {

  getFlights: async (page: number, size: number, code: string): Promise<GetFlightsResponse> => {    

    const queryParams = buildQueryString({ page, size, code });    

    return await get(`${flightUrls.ALL_FLIGHTS}${queryParams}`);
  },
  createFlight: async (data: FormData) => {
    return await post(`${flightUrls.CREATE_FLIGHT}`, data, {
      headers: {
        "Content-Type": "muiltipart/form-data",
        "Access-Control-Allow-Headers": "Accept",
      },
    }, 
  )
 },
 getFlightImage: async (flightId: string): Promise<{data:Blob}> => {    
  return await get(`${flightUrls.ALL_FLIGHTS}/${flightId}/photo`, {
    headers: {
      "responseType": 'blob',
    }
  })
},
deleteFlight: async (flightId: string) => {
  return await httpDelete(`${flightUrls.ALL_FLIGHTS}/${flightId}`)
},
updateFlight: async (data: FormData, flightId: string) => {
  return await put(`${flightUrls.ALL_FLIGHTS}/${flightId}/withPhoto`, data, {
    headers: {
      "Content-Type": "muiltipart/form-data",
      "Access-Control-Allow-Headers": "Accept",
    },
  }, 
)
},
};
