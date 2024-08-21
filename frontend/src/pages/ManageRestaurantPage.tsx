import {
  useCreateMyRestaurant,
  useGetMyRestaurant,
  useGetMyRestaurantOrders,
  useUpdateMyRestaurant,
} from "@/api/MyRestaurantApi";
import { OrderItemCard } from "@/components/OrderItemCard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ManageRestaurantForm from "@/forms/manage-restaurant-form/ManageRestaurantForm";

export const ManageRestaurantPage = () => {
  const { createRestaurant, isPending: createLoading } =
    useCreateMyRestaurant();
  const { updateRestaurant, isPending: LoadingUpdate } =
    useUpdateMyRestaurant();
  const { restaurant } = useGetMyRestaurant();
  const { orders } = useGetMyRestaurantOrders();
console.log(orders)

  const isEditing = !!restaurant;

  return (
    <Tabs defaultValue="orders">
      <TabsList>
        <TabsTrigger value="orders">Orders</TabsTrigger>
        <TabsTrigger value="manage-restaurant">Manage Restaurant</TabsTrigger>
      </TabsList>

      <TabsContent
        value="orders"
        className="space-y-5 bg-gray-50 p-10 rounded-lg"
      >
   <h2 className="text-2xl font-bold">
    {orders?.length } active orders
   </h2>
    {orders?.map((order) => (
<OrderItemCard order={order} key={order._id} />
    ))}
      </TabsContent>
      <TabsContent value="manage-restaurant">

       <ManageRestaurantForm
         onSave={isEditing ? updateRestaurant : createRestaurant}
         restaurant={restaurant}
         isLoading={createLoading || LoadingUpdate}
      />
      </TabsContent>
    </Tabs>
  );
};
