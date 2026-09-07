import { DishAddOn } from '@/features/cart/CartContext';

export const DEFAULT_DISH_ADDONS: DishAddOn[] = [
  {
    id: 'addon-herb-dressing',
    name: 'Herb Vinaigrette',
    price: 40,
    image: '/images/addon-dressing.jpg',
  },
  {
    id: 'addon-cold-juice',
    name: 'Citrus Juice',
    price: 75,
    image: '/images/addon-juice.jpg',
  },
  {
    id: 'addon-avocado-paneer',
    name: 'Avocado & Paneer',
    price: 60,
    image: '/images/addon-avocado.jpg',
  },
];
