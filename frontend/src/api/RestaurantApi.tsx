import { RestaurantSearchResponse } from "@/types";
import { useQuery } from "@tanstack/react-query";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const useSearchRestaurants = (city?: string) => {
  const createSearchRequest = async (): Promise<RestaurantSearchResponse> => {
    const response = await fetch(
      `${API_BASE_URL}/api/restaurant/search/${city}`
    );
    if (response.ok) {
      return response.json();
    } else {
      throw new Error("Error searching restaurants");
    }
  };

  const { data: results, isLoading } = useQuery({
    queryKey: ["searchRestaurants"],
    queryFn: createSearchRequest,
    enabled: !!city,
  });

  return { isLoading, results };
};
