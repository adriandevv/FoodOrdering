import { MenuItem as menuItem } from '@/types';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';

type props = {
    menuItem: menuItem;
    addToCart: () => void;
}

export const MenuItem = ({ menuItem, addToCart }: props) => {


    return (
        <Card className='cursor-pointer shadow-sm shadow-slate-400' onClick={addToCart}>
            <CardHeader>
                <CardTitle>
                    {menuItem.name}
                </CardTitle>
            </CardHeader>
            <CardContent className='font-fold'>
                ${(menuItem.price / 100).toFixed(2)}
            </CardContent>
        </Card>
    )
}
