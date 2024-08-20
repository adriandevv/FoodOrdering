import { Order, Restaurant } from "@/types";
import { useAuth0 } from "@auth0/auth0-react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { toast } from "sonner";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const useGetMyRestaurant = () => {
  const { getAccessTokenSilently } = useAuth0();

  const getMyRestaurantRequest = async (): Promise<Restaurant> => {
    const accessToken = await getAccessTokenSilently();
    const res = await fetch(`${API_BASE_URL}/api/my/restaurant`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    if (!res.ok) {
      throw new Error("Error fetching restaurant");
    }
    return res.json();
  };

  const {
    data: restaurant,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["fetchMyRestaurant"],
    queryFn: getMyRestaurantRequest,
  });

  if (isError) toast.error("Error fetching restaurant");

  return {
    restaurant,
    isLoading,
    isError,
  };
};

export const useCreateMyRestaurant = () => {
  const { getAccessTokenSilently } = useAuth0();

  const createMyRestaurantRequest = async (
    restaurantFormData: FormData
  ): Promise<Restaurant[]> => {
    const accessToken = await getAccessTokenSilently();
    const res = await fetch(`${API_BASE_URL}/api/my/restaurant`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      body: restaurantFormData,
    });
    if (!res.ok) {
      throw new Error("Error creating restaurant");
    }
    return res.json();
  };
  const {
    mutateAsync: createRestaurant,
    isPending,
    isError,
    isSuccess,
  } = useMutation({ mutationFn: createMyRestaurantRequest });

  if (isSuccess) toast.success("Restaurant created successfully");
  if (isError) toast.error("Error creating restaurant");

  return {
    createRestaurant,
    isPending,
    isError,
    isSuccess,
  };
};

export const useUpdateMyRestaurant = () => {
  const { getAccessTokenSilently } = useAuth0();

  const updateMyRestaurantRequest = async (
    restaurantFormData: FormData
  ): Promise<Restaurant> => {
    const accessToken = await getAccessTokenSilently();
    const res = await fetch(`${API_BASE_URL}/api/my/restaurant`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      body: restaurantFormData,
    });
    if (!res.ok) {
      throw new Error("Error updating restaurant");
    }
    return res.json();
  };

  const {
    mutateAsync: updateRestaurant,
    isPending,
    isError,
    isSuccess,
  } = useMutation({ mutationFn: updateMyRestaurantRequest });

  if (isSuccess) toast.success("Restaurant updated successfully");
  if (isError) toast.error("Error updating restaurant");

  return {
    updateRestaurant,
    isPending,
    isError,
    isSuccess,
  };
};

export const useGetMyRestaurantOrders = () => {
  const { getAccessTokenSilently } = useAuth0();

  const getMyRestaurantOrdersRequest = async (): Promise<Order[]> => {
    const accessToken = await getAccessTokenSilently();
    const res = await fetch(`${API_BASE_URL}/api/my/restaurant/orders`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    if (!res.ok) {
      throw new Error("Error fetching orders");
    }
    return res.json();
  };

  const {
    data: orders,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["fetchMyRestaurantOrders"],
    queryFn: getMyRestaurantOrdersRequest,
  });

  return {
    orders,
    isLoading,
    isError,
  };
};
