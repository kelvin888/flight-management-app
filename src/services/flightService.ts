import { flightRepository } from "@/api/flightRepository";

const flightService = {
  getFlights: async (page: number, size: number, code: string) => {    
    return await flightRepository.getFlights(page, size, code);
  },
  createFlight: async(data: FormData) => {
    return await flightRepository.createFlight(data);
  },
  getFlightImage: async(flightId: string) => {
    return await flightRepository.getFlightImage(flightId)
  },
  deleteFlight: async (flightId: string) => {
    return await flightRepository.deleteFlight(flightId)
  },
  updateFlight: async(id: string, data: FormData) => {
    return await flightRepository.updateFlight(data, id);
  },
};

export default flightService;
