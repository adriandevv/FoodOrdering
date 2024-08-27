import { CheckoutSessionRequest, Order } from "@/types";
import { useAuth0 } from "@auth0/auth0-react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { toast } from "sonner";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;



export const useGetMyOrders = () => {
  const { getAccessTokenSilently } = useAuth0();
  const getMyOrdersRequest = async ():Promise<Order[]> => {
    const token = await getAccessTokenSilently();
    const response = await fetch(`${API_BASE_URL}/api/order`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (!response.ok) {
      throw new Error("Error fetching orders");
    }
    return await response.json();
  };
  const { data:orders, isLoading, error } = useQuery({
    queryKey: ["fetchMyOrders"],
    queryFn: getMyOrdersRequest,
    refetchInterval: 5000,
  });

  if (error) {
    toast.error("Error fetching orders");
  }

  return {
    orders,
    isLoading,
  };
};

export const useCreateCheckoutSession = () => {
  const { getAccessTokenSilently } = useAuth0();
  const createCheckoutSessionRequest = async (
    checkoutSessionRequest: CheckoutSessionRequest
  ) => {
    const token = await getAccessTokenSilently();
    const response = await fetch(
      `${API_BASE_URL}/api/order/checkout/create-checkout-session`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(checkoutSessionRequest),
      }
    );
    if (!response.ok) {
      throw new Error("Error creating stripe session");
    }
    return await response.json();
  };
  const {
    mutateAsync: createCheckoutSession,
    isPending,
    error,
    reset,
  } = useMutation({ mutationFn: createCheckoutSessionRequest });

  if (error) {
    toast.error("Error creating stripe session");
    reset();
  }
  return {
    createCheckoutSession,
    isPending,
  };
};
