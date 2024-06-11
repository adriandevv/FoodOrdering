import { useCreateMyRestaurant } from "@/api/MyRestaurantApi";
import ManageRestaurantForm from "@/forms/manage-restaurant-form/ManageRestaurantForm"

export  const ManageRestaurantPage = () => {
  const {createRestaurant, isPending} = useCreateMyRestaurant();

  return <ManageRestaurantForm onSave={createRestaurant} isLoading={isPending} />;
  
}

