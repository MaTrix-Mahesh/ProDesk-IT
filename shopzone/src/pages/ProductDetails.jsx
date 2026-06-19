import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import Loader from '../components/Loader';
import { Star, ShoppingCart, ArrowLeft, CheckCircle2, ShieldCheck, Tag, Box, Milestone } from 'lucide-react';

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [addedPopup, setAddedPopup] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetch(`https://dummyjson.com/products/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error('Product endpoint does not exist.');
        return res.json();
      })
      .then((data) => {
        setProduct(data);
        setLoading(false);
      })
      .catch(() => {
        navigate('/shop');
      });
  }, [id, navigate]);

  const handleAddToCart = () => {
    addToCart(product);
    setAddedPopup(true);
    setTimeout(() => setAddedPopup(false), 2500);
  };

  if (loading) return <Loader />;
  if (!product) return null;

  return (
    <div className="max-w-6xl mx-auto px-6 py-12 space-y-8 pt-24">
      
      {/* Return Catalog Link */}
      <Link 
        to="/shop" 
        className="inline-flex items-center space-x-2 text-sm font-bold text-slate-500 hover:text-brand-600 transition-colors group"
      >
        <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform duration-300" />
        <span>Return to Catalog</span>
      </Link>

      {/* Main Detail Card Container */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 bg-white p-8 md:p-14 rounded-[2.5rem] border border-slate-100/80 shadow-xl shadow-slate-100/50 items-center">
        
        {/* Left Column: Product Image */}
        <div className="aspect-square rounded-3xl bg-slate-50/50 overflow-hidden border border-slate-100/50 flex items-center justify-center p-6 hover:shadow-inner transition-shadow duration-500">
          <img
            src={product.thumbnail}
            alt={product.title}
            className="max-h-full max-w-full object-contain rounded-2xl group-hover:scale-102 transition-transform duration-500"
          />
        </div>

        {/* Right Column: Informative text details content */}
        <div className="flex flex-col justify-between space-y-8">
          
          <div className="space-y-6">
            
            {/* Category and Rating Badges */}
            <div className="flex flex-wrap items-center gap-3">
              <span className="text-[10px] font-bold text-brand-600 uppercase tracking-widest bg-brand-50 px-3 py-1.5 rounded-xl">
                {product.category}
              </span>
              <div className="bg-slate-50 border border-slate-100 px-3 py-1 rounded-xl flex items-center space-x-1.5">
                <Star size={13} className="fill-amber-400 stroke-amber-400" />
                <span className="text-xs font-bold text-slate-800">{product.rating}</span>
                <span className="text-[10px] text-slate-400 font-semibold">(dummy reviews)</span>
              </div>
            </div>

            {/* Product Title */}
            <h1 className="text-3xl md:text-5xl font-black text-slate-950 tracking-tight leading-tight">
              {product.title}
            </h1>

            {/* Product Price */}
            <div className="flex items-baseline space-x-2">
              <span className="text-sm font-bold text-slate-400 uppercase tracking-wider">Price</span>
              <p className="text-3xl font-black text-slate-950">
                ₹{(product.price * 83).toLocaleString('en-IN', { maximumFractionDigits: 2, minimumFractionDigits: 2 })}
              </p>
            </div>

            <hr className="border-slate-100" />

            {/* Product Description */}
            <div className="space-y-2">
              <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Product Overview</h3>
              <p className="text-slate-600 text-sm md:text-base leading-relaxed">
                {product.description}
              </p>
            </div>

            {/* Technical Specifications Widget */}
            <div className="grid grid-cols-2 gap-4 bg-slate-50/50 p-4 rounded-2xl border border-slate-100/50 text-xs">
              <div className="flex items-center space-x-2 text-slate-600">
                <Box size={14} className="text-brand-600" />
                <span>Stock: <strong className="text-slate-800 font-bold">{product.stock ?? 'In Stock'}</strong></span>
              </div>
              <div className="flex items-center space-x-2 text-slate-600">
                <Tag size={14} className="text-brand-600" />
                <span>Brand: <strong className="text-slate-800 font-bold">{product.brand ?? 'Generic'}</strong></span>
              </div>
            </div>

          </div>

          {/* Action buttons and popup status notifications */}
          <div className="space-y-4 pt-4">
            
            <button
              onClick={handleAddToCart}
              className="w-full flex items-center justify-center space-x-2.5 bg-slate-950 hover:bg-brand-600 text-white font-bold py-4.5 rounded-2xl transition-all duration-300 shadow-lg shadow-slate-950/10 hover:shadow-brand-500/20 active:scale-[0.99]"
            >
              <ShoppingCart size={18} />
              <span>Add Items To Basket</span>
            </button>

            {addedPopup && (
              <div className="flex items-center space-x-2 text-emerald-600 text-xs font-bold bg-emerald-50/80 border border-emerald-100 p-3.5 rounded-2xl justify-center animate-scale">
                <CheckCircle2 size={16} />
                <span>Quantity updated inside central environment successfully!</span>
              </div>
            )}

            <div className="flex items-center space-x-2 text-[10px] text-slate-400 justify-center font-semibold uppercase tracking-wider">
              <ShieldCheck size={14} className="text-emerald-500" />
              <span>Verified dynamic parameters securely sourced from server registry node.</span>
            </div>

          </div>

        </div>

      </div>

    </div>
  );
};

export default ProductDetails;