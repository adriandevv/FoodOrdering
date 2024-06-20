import { useCreateMyRestaurant, useGetMyRestaurant } from "@/api/MyRestaurantApi";
import ManageRestaurantForm from "@/forms/manage-restaurant-form/ManageRestaurantForm"

export  const ManageRestaurantPage = () => {
  const {createRestaurant, isPending} = useCreateMyRestaurant();
  const {restaurant}  = useGetMyRestaurant();

  return <ManageRestaurantForm onSave={createRestaurant} restaurant={restaurant}  isLoading={isPending} />;
  
}

