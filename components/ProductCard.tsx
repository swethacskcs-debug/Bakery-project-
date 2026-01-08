
import React from 'react';
import { Product } from '../types';

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onAddToCart }) => {
  return (
    <div className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-pink-50">
      <div className="relative h-64 overflow-hidden">
        <img 
          src={product.image} 
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute top-4 right-4">
          <span className="bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold text-pink-400 shadow-sm uppercase tracking-wider">
            {product.category}
          </span>
        </div>
      </div>
      <div className="p-6">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-xl font-serif font-bold text-gray-800">{product.name}</h3>
          <span className="text-lg font-bold text-pink-500">${product.price.toFixed(2)}</span>
        </div>
        <p className="text-gray-600 text-sm mb-6 line-clamp-2">
          {product.description}
        </p>
        <button
          onClick={() => onAddToCart(product)}
          className="w-full py-3 bg-pink-100 hover:bg-pink-400 text-pink-600 hover:text-white font-bold rounded-xl transition-all duration-300 flex items-center justify-center space-x-2"
        >
          <i className="fa-solid fa-plus text-xs"></i>
          <span>Add to Basket</span>
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
