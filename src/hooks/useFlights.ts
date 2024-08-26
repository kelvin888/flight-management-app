import { queryClient } from "@/api/client/flight";
import { flightKeys } from "@/constants/queryKeys";
import flightService from "@/services/flightService";
import { useMutation, useQuery } from "@tanstack/react-query";
import {useUrlParams} from "./useUrlParams";
import { useFlightStore } from "@/store/flight";
import { toast } from "react-toastify";
import { AxiosError } from "axios";
import {  useSearchParams, useRouter } from "next/navigation";
import { isValidParam } from "@/utils/validation";
import { parseError } from "@/utils/parseError";

export const useFlights = ({ targetOperations = [] }: { targetOperations?: string[] } = {}) => {
  const { updateSearchParam } = useUrlParams();
  const {  closeAddFlightModal } = useFlightStore(state => state);
  const router = useRouter();

  const searchParams = useSearchParams();

  const size = Number(searchParams.get("size")) || 10;
  const code = searchParams.get("code") || '';
  const page = Number(searchParams.get("page")) || 0;

  const { data: flightResponse, isLoading, isFetching } = useQuery({
    queryKey: [flightKeys.GET_FLIGHTS, page, size, code],
    queryFn: async () => {

      if (!isValidParam(searchParams.get("size")) || !isValidParam(searchParams.get("page")) ) {
        router.push('/bad-request');
        throw new Error('Invalid parameters'); 
      }

      const data = await flightService.getFlights(page + 1, size, code);
      return data.data;
    },
    enabled: targetOperations.includes(flightKeys.GET_FLIGHTS)
  });

  const createFlight = useMutation({
    mutationFn: (data:FormData) => flightService.createFlight(data),
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey:[flightKeys.GET_FLIGHTS]});
      closeAddFlightModal()
      toast.success("Flight created successfully")
    },
    onError: (error: AxiosError) => {
      toast.error(parseError(error))
    }
  });

  const updateFlight = useMutation({
    mutationFn: ({ id, data }: { id: string; data: FormData }) => flightService.updateFlight(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [flightKeys.GET_FLIGHTS] });
      toast.success("Flight updated successfully");
    },
    onError: (error: AxiosError) => {
      toast.error(parseError(error));
    },
  });

const deleteFlight = useMutation({
  mutationFn: (flightId:string) => flightService.deleteFlight(flightId),
  onSuccess: () => {
    queryClient.invalidateQueries({queryKey:[flightKeys.GET_FLIGHTS]});
    toast.success("Flight deleted successfully")
  },
});

const handlePageChange = ({ selected }: { selected: number }) => {
  updateSearchParam("page", String(selected))
};

const handlePageSizeChange = ({ newSize }: { newSize: string }) => {
  updateSearchParam("size", newSize)
};

const total = flightResponse?.count || 0
const flights = flightResponse?.resources
const pages = Math.ceil((total || 0) / size);
const loading = isLoading || isFetching

  return {
    flights,
   loading,
    page,
    size,
    code,
    total,
    pages,
    handlePageChange,
    handlePageSizeChange,
    handleFlightCreation: createFlight.mutateAsync,
    isCreating: createFlight.isPending,
    handleFlightUpdate: updateFlight.mutateAsync,
    isUpdating: updateFlight.isPending,
    handleFlightDeleting: deleteFlight.mutateAsync,
    isDeleting: deleteFlight.isPending
  };
};
