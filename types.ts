
export type Category = 'Cakes' | 'Pastries' | 'Cupcakes' | 'Breads' | 'Custom';

export interface Product {
  id: string;
  name: string;
  category: Category;
  price: number;
  description: string;
  image: string;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface Review {
  id: string;
  name: string;
  rating: number;
  comment: string;
  date: string;
}
