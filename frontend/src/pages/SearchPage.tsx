import { useSearchRestaurants } from "@/api/RestaurantApi";
import { useParams } from "react-router-dom";

export const SearchPage = () => {
  const { city } = useParams();
  const { results } = useSearchRestaurants(city);

  return (
    <div>
      SearchPage: {city}{" "}
      <span>
        {results?.data.map((restaurant) => (
          <span>{`found: ${restaurant.restaurantName}`}</span>
        ))}
      </span>
    </div>
  );
};
