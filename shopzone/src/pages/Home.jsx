import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import { ArrowRight, ShieldCheck, Truck, RotateCcw } from 'lucide-react';

const Home = () => {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('https://dummyjson.com/products?limit=4')
      .then((res) => res.json())
      .then((data) => {
        setFeaturedProducts(data.products);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  return (
    <div className="space-y-20 pb-20 pt-16">
      
      {/* Hero Banner Component */}
      <section className="relative mx-6 md:mx-12 my-6 rounded-[2.5rem] bg-gradient-to-tr from-slate-950 via-slate-900 to-indigo-950 text-white overflow-hidden py-24 md:py-36 px-8 md:px-16 shadow-xl">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#0f172a_1px,transparent_1px),linear-gradient(to_bottom,#0f172a_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-30"></div>
        
        {/* Floating gradient glow behind text */}
        <div className="absolute top-1/4 left-1/3 w-[40rem] h-[40rem] bg-brand-500/10 rounded-full blur-[120px] pointer-events-none"></div>
        <div className="absolute bottom-1/4 right-1/4 w-[30rem] h-[30rem] bg-indigo-500/10 rounded-full blur-[100px] pointer-events-none"></div>

        <div className="max-w-5xl mx-auto relative z-10 flex flex-col items-center text-center space-y-8">
          <span className="bg-brand-500/10 text-brand-400 border border-brand-500/20 text-xs font-bold tracking-widest px-4 py-1.5 rounded-full uppercase animate-fade-in">
            New Wave Storefront v2.0
          </span>
          
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-black tracking-tight max-w-4xl leading-[1.1] animate-fade-in">
            The modern interface for <span className="bg-gradient-to-r from-brand-500 to-indigo-400 bg-clip-text text-transparent">premium essentials.</span>
          </h1>
          
          <p className="text-slate-300 md:text-lg max-w-2xl font-normal leading-relaxed text-slate-300/95">
            Engineered layouts. Handpicked items. Discover frictionless digital shopping with unparalleled response speeds and elegant transitions.
          </p>
          
          <div className="pt-6">
            <Link
              to="/shop"
              className="inline-flex items-center space-x-2 bg-white text-slate-950 hover:bg-brand-600 hover:text-white px-8 py-4 rounded-2xl font-bold transition-all duration-300 group shadow-lg shadow-black/25 active:scale-[0.98]"
            >
              <span>Explore Catalog</span>
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform duration-300" />
            </Link>
          </div>
        </div>
      </section>

      {/* Feature Value Props */}
      <section className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="p-8 bg-white rounded-3xl border border-slate-100 shadow-sm flex flex-col items-start text-left space-y-4 hover:border-slate-200 transition-colors duration-300">
          <div className="p-3.5 bg-brand-50 rounded-2xl text-brand-600"><Truck size={24} /></div>
          <div className="space-y-1">
            <h3 className="font-extrabold text-slate-900 text-lg">Global Shipping</h3>
            <p className="text-sm text-slate-500 leading-relaxed">Tracked end-to-end directly to your dispatch center or residential destination address.</p>
          </div>
        </div>
        
        <div className="p-8 bg-white rounded-3xl border border-slate-100 shadow-sm flex flex-col items-start text-left space-y-4 hover:border-slate-200 transition-colors duration-300">
          <div className="p-3.5 bg-emerald-50 rounded-2xl text-emerald-600"><ShieldCheck size={24} /></div>
          <div className="space-y-1">
            <h3 className="font-extrabold text-slate-900 text-lg">Secure Gateways</h3>
            <p className="text-sm text-slate-500 leading-relaxed">All transaction parameters processed securely with tokenized mock payment registers.</p>
          </div>
        </div>
        
        <div className="p-8 bg-white rounded-3xl border border-slate-100 shadow-sm flex flex-col items-start text-left space-y-4 hover:border-slate-200 transition-colors duration-300">
          <div className="p-3.5 bg-indigo-50 rounded-2xl text-indigo-600"><RotateCcw size={24} /></div>
          <div className="space-y-1">
            <h3 className="font-extrabold text-slate-900 text-lg">30-Day Returns</h3>
            <p className="text-sm text-slate-500 leading-relaxed">Unsatisfied? Initiate standard returns with automated courier dispatch networks instantly.</p>
          </div>
        </div>
      </section>

      {/* Featured Grid Section */}
      <section className="max-w-7xl mx-auto px-6 space-y-10">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between border-b border-slate-100 pb-6 gap-4">
          <div>
            <h2 className="text-3xl font-black text-slate-950 tracking-tight">Featured Selections</h2>
            <p className="text-sm text-slate-500 mt-1">Top-voted products across global dynamic demand channels.</p>
          </div>
          <Link to="/shop" className="text-sm font-bold text-brand-600 hover:text-brand-700 inline-flex items-center space-x-1 group">
            <span>View Catalog</span>
            <ArrowRight size={16} className="group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </div>

        {loading ? (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="animate-pulse space-y-4">
                <div className="bg-slate-200 aspect-square rounded-3xl" />
                <div className="h-4 bg-slate-200 rounded-lg w-2/3" />
                <div className="h-4 bg-slate-200 rounded-lg w-1/3" />
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default Home;