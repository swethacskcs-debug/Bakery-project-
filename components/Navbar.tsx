
import React from 'react';

interface NavbarProps {
  cartCount: number;
  onCartClick: () => void;
  onSectionClick: (id: string) => void;
}

const Navbar: React.FC<NavbarProps> = ({ cartCount, onCartClick, onSectionClick }) => {
  return (
    <nav className="sticky top-0 z-50 w-full bg-cream/90 backdrop-blur-md border-b border-pink-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <div className="flex-shrink-0 flex items-center cursor-pointer" onClick={() => onSectionClick('home')}>
            <span className="text-3xl font-serif font-bold text-pink-400">Sweet</span>
            <span className="text-3xl font-serif font-bold text-gray-700 ml-2">Crumbs</span>
          </div>
          
          <div className="hidden md:flex space-x-8">
            {['Products', 'Custom Orders', 'Reviews', 'About'].map((item) => (
              <button
                key={item}
                onClick={() => onSectionClick(item.toLowerCase().replace(' ', '-'))}
                className="text-gray-600 hover:text-pink-400 font-medium transition-colors"
              >
                {item}
              </button>
            ))}
          </div>

          <div className="flex items-center space-x-4">
            <button 
              onClick={onCartClick}
              className="relative p-2 text-gray-600 hover:text-pink-400 transition-colors"
            >
              <i className="fa-solid fa-basket-shopping text-xl"></i>
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-pink-400 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full ring-2 ring-white">
                  {cartCount}
                </span>
              )}
            </button>
            <button className="md:hidden p-2 text-gray-600">
              <i className="fa-solid fa-bars text-xl"></i>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
