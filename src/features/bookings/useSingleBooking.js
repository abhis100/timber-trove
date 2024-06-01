import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router";
import { getBooking } from "../../services/apiBookings";

function useSingleBooking() {
  const { bookingId } = useParams();
  const {
    isLoading,
    error,
    data: booking,
  } = useQuery({
    queryKey: ["booking"],
    queryFn: () => getBooking(bookingId),
    retry: false,
  });

  return { isLoading, error, booking };
}

export default useSingleBooking;
