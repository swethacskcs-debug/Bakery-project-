
import React, { useState, useEffect, useMemo } from 'react';
import Navbar from './components/Navbar';
import ProductCard from './components/ProductCard';
import Cart from './components/Cart';
import CustomOrder from './components/CustomOrder';
import AISuggestions from './components/AISuggestions';
import { PRODUCTS, REVIEWS } from './constants';
import { Product, CartItem, Category } from './types';

const App: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<Category | 'All'>('All');
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  const filteredProducts = useMemo(() => {
    if (activeCategory === 'All') return PRODUCTS;
    return PRODUCTS.filter(p => p.category === activeCategory);
  }, [activeCategory]);

  const addToCart = (product: Product) => {
    setCartItems(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => 
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
    setIsCartOpen(true);
  };

  const updateQuantity = (id: string, delta: number) => {
    setCartItems(prev => 
      prev.map(item => {
        if (item.id === id) {
          const newQty = Math.max(0, item.quantity + delta);
          return { ...item, quantity: newQty };
        }
        return item;
      }).filter(item => item.quantity > 0)
    );
  };

  const removeFromCart = (id: string) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
  };

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar 
        cartCount={cartItems.reduce((sum, item) => sum + item.quantity, 0)}
        onCartClick={() => setIsCartOpen(true)}
        onSectionClick={scrollToSection}
      />

      <main className="flex-grow">
        {/* Hero Section */}
        <section id="home" className="relative h-[85vh] flex items-center overflow-hidden bg-pink-50/30">
          <div className="absolute inset-0 z-0">
            <img 
              src="https://images.unsplash.com/photo-1509440159596-0249088772ff?q=80&w=2000" 
              alt="Bakery Interior" 
              className="w-full h-full object-cover opacity-20 scale-105"
            />
          </div>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="max-w-2xl">
              <span className="inline-block px-4 py-1.5 bg-pink-100 text-pink-500 rounded-full text-sm font-bold uppercase tracking-widest mb-6">
                Freshly Baked Daily
              </span>
              <h1 className="text-6xl md:text-8xl font-serif font-bold text-gray-800 leading-tight mb-6">
                Sweetness in <br /> 
                <span className="text-pink-400 italic">Every Crumb.</span>
              </h1>
              <p className="text-xl text-gray-600 mb-10 leading-relaxed">
                Experience the magic of artisan baking. Hand-crafted pastries, decadent cakes, and wholesome breads made with the finest organic ingredients.
              </p>
              <div className="flex flex-wrap gap-4">
                <button 
                  onClick={() => scrollToSection('products')}
                  className="px-10 py-5 bg-pink-400 hover:bg-pink-500 text-white font-bold rounded-2xl shadow-xl shadow-pink-100 transition-all transform hover:-translate-y-1 active:scale-95"
                >
                  Shop Now
                </button>
                <button 
                  onClick={() => scrollToSection('custom-orders')}
                  className="px-10 py-5 bg-white hover:bg-gray-50 text-gray-800 font-bold rounded-2xl border border-gray-100 shadow-lg transition-all transform hover:-translate-y-1 active:scale-95"
                >
                  Custom Orders
                </button>
              </div>
            </div>
          </div>
          
          {/* Floating Element */}
          <div className="hidden lg:block absolute right-0 top-1/2 -translate-y-1/2 w-1/3 p-8 animate-bounce-slow">
            <div className="relative">
               <img 
                src="https://images.unsplash.com/photo-1488477181946-6428a0291777?q=80&w=800" 
                alt="Featured Cake" 
                className="rounded-3xl shadow-2xl rotate-3"
              />
              <div className="absolute -top-6 -left-6 bg-white p-4 rounded-2xl shadow-xl flex items-center space-x-3">
                <div className="bg-green-100 p-2 rounded-full">
                  <i className="fa-solid fa-leaf text-green-500"></i>
                </div>
                <div>
                  <p className="font-bold text-gray-800 leading-none">100% Organic</p>
                  <p className="text-xs text-gray-400">Locally sourced</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Products Section */}
        <section id="products" className="py-24 bg-cream">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-serif font-bold text-gray-800 mb-4">Our Sweet Menu</h2>
              <div className="w-24 h-1 bg-pink-200 mx-auto rounded-full"></div>
            </div>

            {/* Category Filters */}
            <div className="flex flex-wrap justify-center gap-3 mb-12">
              {['All', 'Cakes', 'Pastries', 'Cupcakes', 'Breads'].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat as Category | 'All')}
                  className={`px-8 py-3 rounded-full text-sm font-bold transition-all ${
                    activeCategory === cat 
                      ? 'bg-pink-400 text-white shadow-lg shadow-pink-100' 
                      : 'bg-white text-gray-600 hover:bg-pink-50 border border-gray-100'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Product Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {filteredProducts.map(product => (
                <ProductCard 
                  key={product.id} 
                  product={product} 
                  onAddToCart={addToCart} 
                />
              ))}
            </div>

            <AISuggestions />
          </div>
        </section>

        <CustomOrder />

        {/* Reviews Section */}
        <section id="reviews" className="py-24 bg-pink-50/30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
             <div className="text-center mb-16">
              <h2 className="text-4xl font-serif font-bold text-gray-800 mb-4">What Our Customers Say</h2>
              <p className="text-gray-500">Real stories from real lovers of handmade quality.</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {REVIEWS.map(review => (
                <div key={review.id} className="bg-white p-8 rounded-3xl shadow-sm border border-pink-50 relative">
                  <div className="flex text-pink-300 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <i key={i} className={`fa-solid fa-star ${i < review.rating ? 'text-yellow-400' : ''}`}></i>
                    ))}
                  </div>
                  <p className="text-gray-600 italic mb-6">"{review.comment}"</p>
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-gray-800">{review.name}</span>
                    <span className="text-xs text-gray-400 uppercase tracking-tighter">{review.date}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="py-24 bg-white overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col lg:flex-row items-center gap-16">
              <div className="flex-1">
                <h2 className="text-4xl font-serif font-bold text-gray-800 mb-8">Our Story</h2>
                <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                  Sweet Crumbs started in a small home kitchen with just a wooden spoon and a big dream. Founded in 2012 by Chef Elena, we've grown from a neighborhood secret to a beloved community hub.
                </p>
                <p className="text-lg text-gray-600 mb-10 leading-relaxed">
                  Every pastry we bake is a labor of love. We believe that food should not only taste divine but also tell a story of craftsmanship and quality. That's why we use only local, cage-free eggs, organic flour, and hand-churned butter.
                </p>
                <div className="grid grid-cols-2 gap-8">
                  <div>
                    <h4 className="text-3xl font-serif font-bold text-pink-400">12+</h4>
                    <p className="text-gray-500 text-sm font-bold uppercase tracking-widest">Years of Joy</p>
                  </div>
                  <div>
                    <h4 className="text-3xl font-serif font-bold text-pink-400">50k+</h4>
                    <p className="text-gray-500 text-sm font-bold uppercase tracking-widest">Happy Hearts</p>
                  </div>
                </div>
              </div>
              <div className="flex-1 relative">
                <div className="grid grid-cols-2 gap-4">
                  <img src="https://images.unsplash.com/photo-1556910103-1c02745aae4d?q=80&w=600" alt="Baking process" className="rounded-2xl shadow-lg mt-12" />
                  <img src="https://images.unsplash.com/photo-1517433670267-08bbd4be890f?q=80&w=600" alt="Pastries" className="rounded-2xl shadow-lg" />
                </div>
                <div className="absolute -z-10 top-0 right-0 w-72 h-72 bg-pink-100 rounded-full blur-3xl opacity-50"></div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
            <div className="col-span-1 md:col-span-1">
              <div className="flex items-center mb-6">
                <span className="text-3xl font-serif font-bold text-pink-400">Sweet</span>
                <span className="text-3xl font-serif font-bold text-white ml-2">Crumbs</span>
              </div>
              <p className="text-gray-400 text-sm leading-relaxed mb-6">
                Artisan baking with heart. Join us for a slice of happiness and a cup of warmth.
              </p>
              <div className="flex space-x-4">
                <a href="#" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-pink-400 transition-colors">
                  <i className="fa-brands fa-instagram"></i>
                </a>
                <a href="#" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-pink-400 transition-colors">
                  <i className="fa-brands fa-facebook-f"></i>
                </a>
                <a href="#" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-pink-400 transition-colors">
                  <i className="fa-brands fa-pinterest-p"></i>
                </a>
              </div>
            </div>
            
            <div>
              <h4 className="font-bold mb-6 text-lg">Quick Links</h4>
              <ul className="space-y-4 text-gray-400">
                <li><button onClick={() => scrollToSection('products')} className="hover:text-pink-400 transition-colors">Our Menu</button></li>
                <li><button onClick={() => scrollToSection('custom-orders')} className="hover:text-pink-400 transition-colors">Custom Cakes</button></li>
                <li><button onClick={() => scrollToSection('about')} className="hover:text-pink-400 transition-colors">About Us</button></li>
                <li><a href="#" className="hover:text-pink-400 transition-colors">Contact</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold mb-6 text-lg">Hours</h4>
              <ul className="space-y-4 text-gray-400 text-sm">
                <li className="flex justify-between"><span>Mon - Fri</span> <span>07:00 - 19:00</span></li>
                <li className="flex justify-between"><span>Saturday</span> <span>08:00 - 20:00</span></li>
                <li className="flex justify-between"><span>Sunday</span> <span>09:00 - 17:00</span></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold mb-6 text-lg">Contact Us</h4>
              <ul className="space-y-4 text-gray-400 text-sm">
                <li className="flex items-start space-x-3">
                  <i className="fa-solid fa-location-dot mt-1 text-pink-400"></i>
                  <span>123 Baker St, Sweetville, FL 34211</span>
                </li>
                <li className="flex items-start space-x-3">
                  <i className="fa-solid fa-phone mt-1 text-pink-400"></i>
                  <span>+1 (555) 123-4567</span>
                </li>
                <li className="flex items-start space-x-3">
                  <i className="fa-solid fa-envelope mt-1 text-pink-400"></i>
                  <span>hello@sweetcrumbs.com</span>
                </li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-gray-500">
            <p>© 2024 Sweet Crumbs Bakery. All rights reserved.</p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="#" className="hover:text-gray-300">Privacy Policy</a>
              <a href="#" className="hover:text-gray-300">Terms of Service</a>
            </div>
          </div>
        </div>
      </footer>

      {/* Floating CTA Buttons */}
      <div className="fixed bottom-8 right-8 flex flex-col space-y-4 z-40">
        <a 
          href="https://wa.me/15551234567" 
          target="_blank" 
          rel="noopener noreferrer"
          className="w-14 h-14 bg-green-500 hover:bg-green-600 text-white rounded-full flex items-center justify-center shadow-2xl transition-all transform hover:scale-110 active:scale-95 group"
        >
          <i className="fa-brands fa-whatsapp text-3xl"></i>
          <span className="absolute right-16 bg-white text-gray-800 px-4 py-2 rounded-xl text-sm font-bold shadow-xl opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
            Chat with us
          </span>
        </a>
        
        <button 
          onClick={() => setIsCartOpen(true)}
          className="w-14 h-14 bg-pink-400 hover:bg-pink-500 text-white rounded-full flex items-center justify-center shadow-2xl transition-all transform hover:scale-110 active:scale-95 group"
        >
          <i className="fa-solid fa-basket-shopping text-xl"></i>
          {cartItems.length > 0 && (
            <span className="absolute top-0 right-0 bg-red-500 text-white text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full ring-2 ring-white">
              {cartItems.reduce((sum, item) => sum + item.quantity, 0)}
            </span>
          )}
          <span className="absolute right-16 bg-white text-gray-800 px-4 py-2 rounded-xl text-sm font-bold shadow-xl opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
            Checkout now
          </span>
        </button>
      </div>

      <Cart 
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={updateQuantity}
        onRemove={removeFromCart}
      />
    </div>
  );
};

export default App;
