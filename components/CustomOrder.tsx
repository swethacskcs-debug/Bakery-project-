
import React, { useState } from 'react';

const CustomOrder: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    date: '',
    occasion: 'Birthday',
    description: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Inquiry received! Our master baker will contact you shortly.");
  };

  return (
    <div id="custom-orders" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="relative">
            <div className="aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl">
              <img 
                src="https://images.unsplash.com/photo-1535141192574-5d4897c12636?q=80&w=800" 
                alt="Custom Cake" 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -bottom-8 -right-8 bg-pink-400 text-white p-8 rounded-2xl shadow-xl hidden md:block">
              <p className="font-serif italic text-xl">"Dreams do come true in cake form."</p>
              <p className="mt-2 text-sm font-bold opacity-80">— Chef Elena</p>
            </div>
          </div>

          <div>
            <h2 className="text-4xl font-serif font-bold text-gray-800 mb-6">Create Your Masterpiece</h2>
            <p className="text-gray-600 mb-8 text-lg">
              From fairy-tale weddings to whimsical birthday parties, we specialize in bringing your sweet visions to life. Tell us what you're dreaming of.
            </p>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Full Name</label>
                  <input 
                    type="text" 
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-pink-400 focus:ring-2 focus:ring-pink-100 outline-none transition-all"
                    placeholder="Your name"
                    value={formData.name}
                    onChange={e => setFormData({...formData, name: e.target.value})}
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Occasion</label>
                  <select 
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-pink-400 focus:ring-2 focus:ring-pink-100 outline-none transition-all"
                    value={formData.occasion}
                    onChange={e => setFormData({...formData, occasion: e.target.value})}
                  >
                    <option>Birthday</option>
                    <option>Wedding</option>
                    <option>Anniversary</option>
                    <option>Corporate</option>
                    <option>Other</option>
                  </select>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Tell us about your dream cake</label>
                <textarea 
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-pink-400 focus:ring-2 focus:ring-pink-100 outline-none transition-all min-h-[120px]"
                  placeholder="Flavors, colors, theme, serving size..."
                  value={formData.description}
                  onChange={e => setFormData({...formData, description: e.target.value})}
                  required
                />
              </div>

              <button 
                type="submit"
                className="w-full py-4 bg-gray-800 hover:bg-gray-900 text-white font-bold rounded-xl transition-all shadow-lg hover:shadow-gray-200"
              >
                Send Inquiry Request
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomOrder;
