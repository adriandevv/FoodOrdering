import { SearchState } from "@/pages/SearchPage";
import { RestaurantSearchResponse } from "@/types";
import { useQuery } from "@tanstack/react-query";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const useSearchRestaurants = (searchState:SearchState,city?: string) => {
  const createSearchRequest = async (): Promise<RestaurantSearchResponse> => {
    const params = new URLSearchParams();
    params.set("searchQuery", searchState.searchQuery);
    params.set("page", searchState.page?.toString() ?? "1");
    params.set("selectedCuisines", searchState.selectedCuisines.join(","));
    console.log( searchState.selectedCuisines);
    const response = await fetch(
      `${API_BASE_URL}/api/restaurant/search/${city}?${params.toString()}`
    );
    if (response.ok) {
      return response.json();
    } else {
      throw new Error("Error searching restaurants");
    }
  };

  const { data: results, isLoading } = useQuery({
    queryKey: ["searchRestaurants",searchState],
    queryFn: createSearchRequest,
    enabled: !!city,
  });

  return { isLoading, results };
};
