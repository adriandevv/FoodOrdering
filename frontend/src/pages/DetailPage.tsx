import { useGetRestaurant } from '@/api/RestaurantApi';
import { MenuItem } from '@/components/MenuItem';
import { RestaurantInfo } from '@/components/RestaurantInfo';
import { AspectRatio } from '@radix-ui/react-aspect-ratio';
import { useParams } from 'react-router-dom';

export const DetailPage = () => {
    const { restaurantId } = useParams<{ restaurantId: string }>();
    if (!restaurantId) {
        return <div>Invalid restaurant ID</div>;
    }
    const { restaurant, isPending } = useGetRestaurant(restaurantId);
    if (isPending || !restaurant) {
        return <div>Loading...</div>;
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
                        <MenuItem menuItem={menuItem} />
                    ))}
                </div>
            </div>
        </div>
    )
}