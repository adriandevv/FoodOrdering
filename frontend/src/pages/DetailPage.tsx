import { useGetRestaurant } from '@/api/RestaurantApi';
import { OrderSummary } from '@/components/OrderSummary';
import { RestaurantInfo } from '@/components/RestaurantInfo';
import { Card, CardFooter } from '@/components/ui/card';
import { MenuItem } from '@/components/MenuItem';
import { MenuItem as MenuItemType } from '@/types';
import { AspectRatio } from '@radix-ui/react-aspect-ratio';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { CheckoutButton } from '@/components/CheckoutButton';
import { UserFormData } from '@/forms/user-profile-form/UserProfileForm';


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
    const [cartItems, setCartItems] = useState<CartItem[]>(() => {
        const storedCartItems = sessionStorage.getItem(`cartItems-${restaurantId}`);
        if (storedCartItems) {
            return JSON.parse(storedCartItems)
        }
        return []
    });
    if (isPending || !restaurant) {
        return <div>Loading...</div>;
    }
    const setStorage = (cartItems: Array<CartItem>) => {
        sessionStorage.setItem(`cartItems-${restaurantId}`, JSON.stringify(cartItems))
    }

    const addTocart = (menuItem: MenuItemType) => {
        setCartItems((prevCartItems) => {
            const existingItem = prevCartItems.find((item) => item._id === menuItem._id);
            if (existingItem) {
                const res = prevCartItems.map((item) => {
                    if (item._id === menuItem._id) {

                        return {
                            ...item,
                            quantity: item.quantity + 1
                        }
                    }

                    return item;
                })
                setStorage(res)
                return res;
            }
            const res = [
                ...prevCartItems,
                {
                    ...menuItem,
                    quantity: 1
                }
            ]
            setStorage(res)
            return res;
        })
    }

    const removeFromCart = (menuItem: CartItem) => {
        setCartItems((prevCartItems) => {
            //delete item from cart
            const res = prevCartItems.filter((item) => item._id !== menuItem._id)
            setStorage(res)
            return res;
        })

    }
    const onCheckout = (userFormData: UserFormData) => {
        console.log("userFormData", userFormData)
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
                        <MenuItem key={menuItem._id} menuItem={menuItem} addToCart={() => addTocart(menuItem)} />
                    ))}
                </div>
                <div className="">
                    <Card>
                        <OrderSummary restaurant={restaurant} cartItems={cartItems} removeFromCart={removeFromCart} />
                        <CardFooter>
                            <CheckoutButton disabled={cartItems.length === 0} onCheckout={onCheckout} />
                        </CardFooter>
                    </Card>
                </div>
            </div>
        </div>
    )
}