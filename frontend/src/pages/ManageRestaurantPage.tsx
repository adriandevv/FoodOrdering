import {
  useCreateMyRestaurant,
  useGetMyRestaurant,
  useUpdateMyRestaurant,
} from "@/api/MyRestaurantApi";
import ManageRestaurantForm from "@/forms/manage-restaurant-form/ManageRestaurantForm";

export const ManageRestaurantPage = () => {
  const { createRestaurant, isPending: createLoading } =
    useCreateMyRestaurant();
  const { updateRestaurant, isPending: LoadingUpdate } =
    useUpdateMyRestaurant();
  const { restaurant } = useGetMyRestaurant();

  const isEdditing = !!restaurant;

  return (
    <ManageRestaurantForm
      onSave={isEdditing ? updateRestaurant : createRestaurant}
      restaurant={restaurant}
      isLoading={createLoading || LoadingUpdate}
    />
  );
};
