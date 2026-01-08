
import React, { useState } from 'react';
import { bakeryAI } from '../services/geminiService';

const AISuggestions: React.FC = () => {
  const [mood, setMood] = useState('');
  const [suggestion, setSuggestion] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSuggest = async () => {
    if (!mood.trim()) return;
    setLoading(true);
    const result = await bakeryAI.suggestSweet(mood);
    setSuggestion(result);
    setLoading(false);
  };

  return (
    <div className="bg-pink-50 rounded-3xl p-8 lg:p-12 mt-24 max-w-5xl mx-auto shadow-inner border border-pink-100 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-64 h-64 bg-white/40 rounded-full blur-3xl -mr-32 -mt-32"></div>
      
      <div className="relative z-10 text-center">
        <span className="inline-block px-4 py-1.5 bg-white text-pink-400 rounded-full text-xs font-bold uppercase tracking-widest mb-4 shadow-sm">
          AI Sweet Assistant
        </span>
        <h2 className="text-3xl font-serif font-bold text-gray-800 mb-4">What's your mood today?</h2>
        <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
          Not sure what to pick? Tell our AI how you're feeling, and we'll recommend the perfect treat to brighten your day.
        </p>

        <div className="flex flex-col md:flex-row gap-4 max-w-xl mx-auto">
          <input
            type="text"
            className="flex-1 px-6 py-4 rounded-2xl border-none shadow-sm focus:ring-2 focus:ring-pink-200 outline-none text-lg"
            placeholder="e.g. A bit blue, extremely happy, adventurous..."
            value={mood}
            onChange={(e) => setMood(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSuggest()}
          />
          <button
            onClick={handleSuggest}
            disabled={loading}
            className="px-8 py-4 bg-pink-400 hover:bg-pink-500 text-white font-bold rounded-2xl shadow-lg shadow-pink-200 transition-all transform active:scale-95 disabled:opacity-50"
          >
            {loading ? <i className="fa-solid fa-spinner fa-spin"></i> : "Suggest"}
          </button>
        </div>

        {suggestion && (
          <div className="mt-8 p-6 bg-white rounded-2xl shadow-md border border-pink-50 animate-fade-in">
            <p className="text-gray-700 italic text-lg leading-relaxed">
              "{suggestion}"
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AISuggestions;
