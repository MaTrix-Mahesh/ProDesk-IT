import React, { useState, useEffect } from 'react';
import ProductCard from '../components/ProductCard';
import Loader from '../components/Loader';
import { SlidersHorizontal, AlertTriangle, Search, X } from 'lucide-react';

const Shop = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Filtering and sorting state parameters
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('default');

  useEffect(() => {
    fetch('https://dummyjson.com/products?limit=100') // fetch 100 products so we have a good catalog
      .then((res) => {
        if (!res.ok) throw new Error('Failed to retrieve inventory data records.');
        return res.json();
      })
      .then((data) => {
        setProducts(data.products);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <Loader />;

  if (error) {
    return (
      <div className="max-w-md mx-auto my-16 p-8 bg-rose-50 rounded-3xl border border-rose-100 text-center space-y-4 animate-scale">
        <div className="w-14 h-14 bg-rose-100 rounded-full flex items-center justify-center text-rose-600 mx-auto">
          <AlertTriangle size={24} />
        </div>
        <h3 className="text-lg font-black text-slate-900">Network Failure</h3>
        <p className="text-sm text-slate-600 leading-relaxed">{error}</p>
        <button 
          onClick={() => window.location.reload()}
          className="px-5 py-2.5 bg-slate-950 hover:bg-brand-600 text-white rounded-xl text-sm font-bold transition-colors"
        >
          Retry Connection
        </button>
      </div>
    );
  }

  // Derive unique categories dynamically from the loaded dataset
  const categories = ['all', ...new Set(products.map((p) => p.category))];

  // Apply filters and sort logic
  const filteredProducts = products
    .filter((product) => {
      const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
      const matchesSearch = product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            product.description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    })
    .sort((a, b) => {
      if (sortBy === 'price-low') return a.price - b.price;
      if (sortBy === 'price-high') return b.price - a.price;
      if (sortBy === 'rating') return b.rating - a.rating;
      return 0;
    });

  return (
    <div className="max-w-7xl mx-auto px-6 py-12 space-y-10 pt-20">
      
      {/* Header Info */}
      <div className="flex flex-col md:flex-row md:items-end md:justify-between border-b border-slate-100 pb-6 gap-4">
        <div>
          <h1 className="text-3xl font-black text-slate-950 tracking-tight">Global Storefront</h1>
          <p className="text-sm text-slate-500 mt-1">Browse and filter available premium products and pricing tags.</p>
        </div>
        <div className="text-xs font-bold text-slate-400 bg-slate-50 border border-slate-100 px-3.5 py-1.5 rounded-xl self-start md:self-auto">
          Showing {filteredProducts.length} of {products.length} Products
        </div>
      </div>

      {/* Filter and Control Dashboard Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">
        
        {/* Left Side: Filter Sidebar Settings Panel */}
        <div className="space-y-6 lg:sticky lg:top-24 bg-white p-6 rounded-3xl border border-slate-100">
          
          <div className="flex items-center justify-between pb-4 border-b border-slate-50">
            <h2 className="font-extrabold text-slate-900 flex items-center space-x-2">
              <SlidersHorizontal size={18} className="text-brand-600" />
              <span>Filters & Sorting</span>
            </h2>
            {(searchQuery || selectedCategory !== 'all' || sortBy !== 'default') && (
              <button 
                onClick={() => { setSearchQuery(''); setSelectedCategory('all'); setSortBy('default'); }}
                className="text-xs font-bold text-rose-600 hover:text-rose-700 flex items-center space-x-1"
              >
                <X size={12} />
                <span>Reset</span>
              </button>
            )}
          </div>

          {/* Search Box Inputs */}
          <div className="space-y-2">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Search Catalog</label>
            <div className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search products..."
                className="w-full bg-slate-50 border border-slate-200 focus:border-brand-500 focus:bg-white p-3.5 pl-10 rounded-2xl text-sm outline-none transition-all"
              />
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
            </div>
          </div>

          {/* Sort By Dropdown */}
          <div className="space-y-2">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Sort Parameters</label>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 focus:border-brand-500 focus:bg-white p-3.5 rounded-2xl text-sm outline-none transition-all font-semibold text-slate-700 cursor-pointer"
            >
              <option value="default">Default Catalog Order</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Rating: Top Rated</option>
            </select>
          </div>

          {/* Categories Pill List */}
          <div className="space-y-2.5">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block">Categories</label>
            <div className="flex flex-wrap lg:flex-col gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`text-left px-3.5 py-2.5 rounded-xl text-xs font-bold capitalize transition-all duration-200 ${
                    selectedCategory === cat
                      ? 'bg-brand-600 text-white shadow-sm shadow-brand-500/20'
                      : 'bg-slate-50 hover:bg-slate-100 text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {cat.replace('-', ' ')}
                </button>
              ))}
            </div>
          </div>

        </div>

        {/* Right Side: Product Catalog Grid Display */}
        <div className="lg:col-span-3">
          {filteredProducts.length === 0 ? (
            <div className="py-20 text-center space-y-4 bg-white border border-slate-100 rounded-3xl">
              <p className="text-slate-400 text-sm font-bold">No product profiles match the filtered query parameters.</p>
              <button 
                onClick={() => { setSearchQuery(''); setSelectedCategory('all'); setSortBy('default'); }}
                className="px-4 py-2 bg-slate-950 text-white rounded-xl text-xs font-bold hover:bg-brand-600 transition-colors"
              >
                Clear Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>

      </div>

    </div>
  );
};

export default Shop;