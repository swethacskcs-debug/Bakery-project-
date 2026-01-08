
import { Product, Review } from './types';

export const PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'Velvet Dream Cake',
    category: 'Cakes',
    price: 45.00,
    description: 'Smooth red velvet with layers of premium cream cheese frosting.',
    image: 'https://images.unsplash.com/photo-1586190848861-99aa4a171e90?q=80&w=800'
  },
  {
    id: '2',
    name: 'Belgian Chocolate Ganache',
    category: 'Cakes',
    price: 52.00,
    description: 'Triple layered dark chocolate cake topped with silky ganache.',
    image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?q=80&w=800'
  },
  {
    id: '3',
    name: 'Almond Croissant',
    category: 'Pastries',
    price: 4.50,
    description: 'Flaky, buttery layers filled with rich almond cream.',
    image: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?q=80&w=800'
  },
  {
    id: '4',
    name: 'Lemon Meringue Cupcake',
    category: 'Cupcakes',
    price: 3.75,
    description: 'Zesty lemon core with a toasted fluffy meringue peak.',
    image: 'https://images.unsplash.com/photo-1519869325930-281384150729?q=80&w=800'
  },
  {
    id: '5',
    name: 'Artisan Sourdough',
    category: 'Breads',
    price: 8.00,
    description: '48-hour fermented loaf with a perfect crunchy crust.',
    image: 'https://images.unsplash.com/photo-1585478259715-876acc5be8eb?q=80&w=800'
  },
  {
    id: '6',
    name: 'Lavender Berry Tart',
    category: 'Pastries',
    price: 6.50,
    description: 'Sweet shortcrust with lavender-infused custard and fresh berries.',
    image: 'https://images.unsplash.com/photo-1519915028121-7d3463d20b13?q=80&w=800'
  },
  {
    id: '7',
    name: 'Salted Caramel Pecan',
    category: 'Cupcakes',
    price: 3.95,
    description: 'Vanilla bean sponge with gooey caramel and toasted pecans.',
    image: 'https://images.unsplash.com/photo-1576618148400-f54bed99fcfd?q=80&w=800'
  },
  {
    id: '8',
    name: 'Rosewater Pistachio Cake',
    category: 'Cakes',
    price: 48.00,
    description: 'Elegant sponge with floral notes and crushed roasted pistachios.',
    image: 'https://images.unsplash.com/photo-1535231544450-b41a247030e9?q=80&w=800'
  }
];

export const REVIEWS: Review[] = [
  {
    id: 'r1',
    name: 'Sophie Bennett',
    rating: 5,
    comment: 'The best red velvet I have ever tasted! It was the star of my birthday party.',
    date: 'Oct 12, 2023'
  },
  {
    id: 'r2',
    name: 'Julian Thorne',
    rating: 5,
    comment: 'Their sourdough is legendary. Perfect crust and crumb every single time.',
    date: 'Nov 05, 2023'
  },
  {
    id: 'r3',
    name: 'Emma Watson',
    rating: 4,
    comment: 'The almond croissants are so fresh, they melt in your mouth.',
    date: 'Dec 01, 2023'
  }
];
