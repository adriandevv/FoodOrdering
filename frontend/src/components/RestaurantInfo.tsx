import { Restaurant } from "@/types"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card"
import { Dot } from "lucide-react"

type props = {
    restaurant: Restaurant
}

export const RestaurantInfo = ({ restaurant }: props) => {
    return (
        <Card className="shadow-md shadow-slate-400">
            <CardHeader>
                <CardTitle className="text-3xl font-bold tracking-tight">
                    {restaurant.restaurantName}
                </CardTitle>
                <CardDescription>
                    {restaurant.city}, {restaurant.country}
                </CardDescription>

            </CardHeader>
            <CardContent className="flex">
                {restaurant.cuisines.map((cuisine, index) => (
                    <span key={cuisine} className="flex">
                        <span>
                            {cuisine}
                        </span>
                        {index < restaurant.cuisines.length - 1 && <Dot />}
                    </span>

                ))}
            </CardContent>
        </Card>
    )
}
