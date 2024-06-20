import { Restaurant } from "@/types";
import { useAuth0 } from "@auth0/auth0-react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { toast } from "sonner";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const useGetMyRestaurant = () => {
  const { getAccessTokenSilently } = useAuth0();

  const getMyRestaurantRequest = async (): Promise<Restaurant[]> => {
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
