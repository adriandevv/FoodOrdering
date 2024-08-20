import { useGetMyOrders } from '@/api/OrderApi';
import { OrderStatusDetail } from '@/components/OrderStatusDetail';
import { OrderStatusHeader } from '@/components/OrderStatusHeader';
import { AspectRatio } from '@/components/ui/aspect-ratio';

export const OrderStatusPage = () => {
const {orders, isLoading} = useGetMyOrders();

if(isLoading){
    return <div>Loading...</div>
}
if(!orders || orders.length === 0){
    return <div>No orders found</div>
}

    return (
    <div className='space-y-10'>
        {orders.map((order)=>(
            <div key={order._id} className='space-y-10 bg-gray-100 p-10 rounded-lg shadow-lg'>
                <OrderStatusHeader order={order}/>
                <div className='grid gap-10 md:grid-cols-2'>
                    <OrderStatusDetail order={order}/>
                    <AspectRatio ratio={16/9}>
                        <img src={order.restaurant.imageUrl} alt={order.restaurant.restaurantName} className='object-cover rounded-lg h-full w-full shadow'/>
                    </AspectRatio>
                </div>
            </div>
        ))}
    </div>
  )
}
