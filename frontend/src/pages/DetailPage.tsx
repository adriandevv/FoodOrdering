import { useGetRestaurant } from '@/api/RestaurantApi';
import { OrderSummary } from '@/components/OrderSummary';
import { RestaurantInfo } from '@/components/RestaurantInfo';
import { Card } from '@/components/ui/card';
import { MenuItem } from '@/components/MenuItem';
import { MenuItem as MenuItemType } from '@/types';
import { AspectRatio } from '@radix-ui/react-aspect-ratio';
import { useState } from 'react';
import { useParams } from 'react-router-dom';


export type CartItem = {
    _id: string;
    name: string;
    price: number;
    quantity: number;
}

export const DetailPage = () => {
    const { restaurantId } = useParams<{ restaurantId: string }>();
    if (!restaurantId) {
        return <div>Invalid restaurant ID</div>;
    }
    const { restaurant, isPending } = useGetRestaurant(restaurantId);
    if (isPending || !restaurant) {
        return <div>Loading...</div>;
    }
    const [cartItems, setCartItems] = useState<CartItem[]>([]);
    const addTocart = (menuItem: MenuItemType) => {
        setCartItems((prevCartItems) => {
            const existingItem = prevCartItems.find((item) => item._id === menuItem._id);
            if (existingItem) {
                return prevCartItems.map((item) => {
                    if (item._id === menuItem._id) {
                        return {
                            ...item,
                            quantity: item.quantity + 1
                        }
                    }
                    return item;
                })
            }
            return [
                ...prevCartItems,
                {
                    ...menuItem,
                    quantity: 1
                }
            ]
        })
    }


    return (
        <div className='flex flex-col gap-10'>
            <AspectRatio
                ratio={16 / 5}
            >
                <img className='rounded-md shadow shadow-slate-400 object-cover h-full w-full' src={restaurant.imageUrl} alt={restaurant.restaurantName} />
            </AspectRatio>
            <div className='grid md:grid-cols-[4fr_2fr] gap-5 md:px-32'>
                <div className='flex flex-col gap-4'>
                    <RestaurantInfo restaurant={restaurant} />
                    <span className='text-2xl font-bold tracking-tight'>
                        Menu
                    </span>
                    {restaurant.menuItems.map((menuItem) => (
                        <MenuItem menuItem={menuItem} addToCart={() => addTocart(menuItem)} />
                    ))}
                </div>
                <div className="">
                    <Card>
                        <OrderSummary restaurant={restaurant} cartItems={cartItems} />
                    </Card>
                </div>
            </div>
        </div>
    )
}