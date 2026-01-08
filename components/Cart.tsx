
import React from 'react';
import { CartItem } from '../types';

interface CartProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (id: string, delta: number) => void;
  onRemove: (id: string) => void;
}

const Cart: React.FC<CartProps> = ({ isOpen, onClose, items, onUpdateQuantity, onRemove }) => {
  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[60] overflow-hidden">
      <div className="absolute inset-0 bg-black/30 backdrop-blur-sm" onClick={onClose} />
      <div className="absolute inset-y-0 right-0 max-w-md w-full bg-white shadow-2xl flex flex-col animate-slide-in">
        <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-pink-50/50">
          <h2 className="text-2xl font-serif font-bold text-gray-800">Your Basket</h2>
          <button onClick={onClose} className="p-2 hover:bg-white rounded-full transition-colors">
            <i className="fa-solid fa-xmark text-xl text-gray-400"></i>
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center">
              <div className="w-24 h-24 bg-pink-50 rounded-full flex items-center justify-center mb-4">
                <i className="fa-solid fa-cookie-bite text-4xl text-pink-200"></i>
              </div>
              <p className="text-gray-500 font-medium">Your basket is empty.</p>
              <button onClick={onClose} className="mt-4 text-pink-400 font-bold hover:underline">Start shopping</button>
            </div>
          ) : (
            items.map((item) => (
              <div key={item.id} className="flex space-x-4 border-b border-gray-50 pb-4">
                <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded-xl" />
                <div className="flex-1">
                  <div className="flex justify-between">
                    <h4 className="font-bold text-gray-800">{item.name}</h4>
                    <button onClick={() => onRemove(item.id)} className="text-gray-300 hover:text-red-400">
                      <i className="fa-solid fa-trash-can text-sm"></i>
                    </button>
                  </div>
                  <p className="text-sm text-pink-400 font-bold mb-2">${item.price.toFixed(2)}</p>
                  <div className="flex items-center space-x-3">
                    <button 
                      onClick={() => onUpdateQuantity(item.id, -1)}
                      className="w-7 h-7 flex items-center justify-center border border-gray-200 rounded-lg hover:border-pink-300 transition-colors"
                    >
                      <i className="fa-solid fa-minus text-[10px]"></i>
                    </button>
                    <span className="font-bold text-sm w-4 text-center">{item.quantity}</span>
                    <button 
                      onClick={() => onUpdateQuantity(item.id, 1)}
                      className="w-7 h-7 flex items-center justify-center border border-gray-200 rounded-lg hover:border-pink-300 transition-colors"
                    >
                      <i className="fa-solid fa-plus text-[10px]"></i>
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {items.length > 0 && (
          <div className="p-6 border-t border-gray-100 bg-gray-50/50">
            <div className="flex justify-between mb-4">
              <span className="text-gray-600">Subtotal</span>
              <span className="text-xl font-bold text-gray-800">${subtotal.toFixed(2)}</span>
            </div>
            <p className="text-xs text-gray-400 mb-6 italic">Tax and delivery calculated at checkout.</p>
            <button className="w-full py-4 bg-pink-400 hover:bg-pink-500 text-white font-bold rounded-2xl shadow-lg shadow-pink-200 transition-all transform active:scale-95">
              Proceed to Checkout
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
