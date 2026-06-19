
import { Link } from 'react-router-dom';
import { Star, ArrowRight } from 'lucide-react';

const ProductCard = ({ product }) => {
  return (
    <div className="group bg-white rounded-3xl border border-slate-100/80 overflow-hidden hover:shadow-xl hover:shadow-slate-100/80 hover:-translate-y-1.5 transition-all duration-300 flex flex-col h-full animate-scale">
      
      {/* Thumbnail Block */}
      <div className="relative aspect-square bg-slate-50/50 overflow-hidden">
        <img
          src={product.thumbnail}
          alt={product.title}
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
          loading="lazy"
        />
        
        {/* Rating Badge */}
        <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-md px-2.5 py-1 rounded-xl flex items-center space-x-1 shadow-sm border border-slate-100/50">
          <Star size={13} className="fill-amber-400 stroke-amber-400" />
          <span className="text-xs font-bold text-slate-800">{product.rating}</span>
        </div>
      </div>

      {/* Info Block */}
      <div className="p-6 flex flex-col flex-grow space-y-4">
        
        <div className="space-y-1.5 flex-1">
          <span className="text-[10px] font-bold text-brand-600 uppercase tracking-widest bg-brand-50 px-2.5 py-1 rounded-lg">
            {product.category}
          </span>
          <h3 className="font-extrabold text-slate-900 text-base line-clamp-1 group-hover:text-brand-600 transition-colors pt-2">
            {product.title}
          </h3>
          <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
            {product.description}
          </p>
        </div>
        
        {/* Footer Info Action Row */}
        <div className="pt-4 flex items-center justify-between border-t border-slate-50">
          <div className="flex flex-col">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Price</span>
            <span className="text-lg font-black text-slate-950">
              ₹{(product.price * 83).toLocaleString('en-IN', { maximumFractionDigits: 2, minimumFractionDigits: 2 })}
            </span>
          </div>
          
          <Link
            to={`/product/${product.id}`}
            className="inline-flex items-center space-x-1.5 text-xs font-bold bg-slate-50 group-hover:bg-brand-600 text-slate-700 group-hover:text-white px-3.5 py-2.5 rounded-xl transition-all duration-300"
          >
            <span>View Details</span>
            <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform duration-300" />
          </Link>
        </div>

      </div>
    </div>
  );
};

export default ProductCard;