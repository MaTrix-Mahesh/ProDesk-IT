
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { Trash2, Plus, Minus, ArrowRight, ShoppingCart } from 'lucide-react';

const Cart = () => {
  const { cart, updateQuantity, removeFromCart, getCartTotal } = useCart();
  const navigate = useNavigate();

  if (cart.length === 0) {
    return (
      <div className="max-w-md mx-auto my-20 text-center space-y-8 px-6 pt-20">
        
        {/* Animated Shopping Cart Graphic */}
        <div className="relative w-24 h-24 mx-auto flex items-center justify-center bg-slate-50 rounded-full border border-slate-100/80">
          <div className="absolute inset-0 rounded-full bg-brand-500/5 animate-pulse"></div>
          <ShoppingCart size={32} className="text-slate-400" />
        </div>

        {/* Text descriptions */}
        <div className="space-y-3">
          <h2 className="text-2xl font-black text-slate-900 tracking-tight">Your Basket is Empty</h2>
          <p className="text-slate-500 text-sm md:text-base leading-relaxed">
            You haven't committed any items to the current session store model state configuration yet.
          </p>
        </div>

        {/* Storefront button action */}
        <div className="pt-2">
          <Link
            to="/shop"
            className="w-full inline-flex items-center justify-center space-x-2 bg-slate-950 hover:bg-brand-600 text-white font-bold py-4 rounded-2xl transition-all duration-300 shadow-md hover:shadow-brand-500/20 active:scale-[0.99]"
          >
            <span>Return to Storefront</span>
          </Link>
        </div>

      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-6 py-12 space-y-8 pt-24">
      
      {/* Title */}
      <div>
        <h1 className="text-3xl font-black text-slate-950 tracking-tight">Your Active Cart State</h1>
        <p className="text-sm text-slate-500 mt-1">Review the parameters and quantities of items before authorization.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 items-start">
        
        {/* Cart Item Row Section Layout */}
        <div className="lg:col-span-2 space-y-4">
          {cart.map((item) => (
            <div
              key={item.id}
              className="flex items-center space-x-4 bg-white p-4.5 rounded-3xl border border-slate-100 shadow-xs hover:border-slate-200 transition-colors"
            >
              {/* Product Thumbnail */}
              <div className="w-20 h-20 bg-slate-50/50 rounded-2xl border border-slate-100 flex items-center justify-center p-2 flex-shrink-0">
                <img
                  src={item.thumbnail}
                  alt={item.title}
                  className="max-h-full max-w-full object-contain rounded-lg"
                />
              </div>

              {/* Title & category details */}
              <div className="flex-grow min-w-0 space-y-1">
                <h3 className="font-extrabold text-slate-900 text-sm md:text-base truncate hover:text-brand-600 transition-colors">
                  {item.title}
                </h3>
                <span className="text-[10px] font-bold text-slate-400 uppercase bg-slate-50 border border-slate-100/50 px-2 py-0.5 rounded-md inline-block">
                  {item.category}
                </span>
                <p className="text-sm font-black text-slate-950 mt-1">₹{(item.price * 83).toLocaleString('en-IN', { maximumFractionDigits: 2, minimumFractionDigits: 2 })}</p>
              </div>
              
              {/* Incremental and Decremental Controls Container Block */}
              <div className="flex items-center space-x-2 bg-slate-50 border border-slate-100 p-1.5 rounded-xl">
                <button
                  onClick={() => updateQuantity(item.id, 'decrement')}
                  className="p-1.5 text-slate-500 hover:text-slate-900 hover:bg-white rounded-lg transition-all"
                  title="Decrement Quantity"
                >
                  <Minus size={13} />
                </button>
                <span className="text-xs font-extrabold px-1.5 text-slate-800">{item.quantity}</span>
                <button
                  onClick={() => updateQuantity(item.id, 'increment')}
                  className="p-1.5 text-slate-500 hover:text-slate-900 hover:bg-white rounded-lg transition-all"
                  title="Increment Quantity"
                >
                  <Plus size={13} />
                </button>
              </div>

              {/* Remove item button */}
              <button
                onClick={() => removeFromCart(item.id)}
                className="p-2.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition-all duration-300"
                title="Remove item"
              >
                <Trash2 size={16} />
              </button>

            </div>
          ))}
        </div>

        {/* Pricing aggregation balance dynamic panel summaries */}
        <div className="bg-white p-6 md:p-8 rounded-[2rem] border border-slate-100 shadow-sm space-y-6">
          <h2 className="font-extrabold text-slate-900 text-lg border-b border-slate-50 pb-3">
            Transaction Summary
          </h2>
          
          <div className="space-y-4 text-sm">
            <div className="flex justify-between text-slate-500 font-semibold">
              <span>Subtotal Item Value</span>
              <span className="text-slate-900 font-bold">₹{(getCartTotal() * 83).toLocaleString('en-IN', { maximumFractionDigits: 2, minimumFractionDigits: 2 })}</span>
            </div>
            
            <div className="flex justify-between text-slate-500 font-semibold">
              <span>Logistics & Freight</span>
              <span className="text-emerald-600 font-bold bg-emerald-50 px-2 py-0.5 rounded-md text-xs">FREE</span>
            </div>
            
            <hr className="border-slate-50" />
            
            <div className="flex justify-between text-base font-black text-slate-950">
              <span>Total Gross Value</span>
              <span className="text-lg">₹{(getCartTotal() * 83).toLocaleString('en-IN', { maximumFractionDigits: 2, minimumFractionDigits: 2 })}</span>
            </div>
          </div>

          <div className="pt-2">
            <button
              onClick={() => navigate('/checkout')}
              className="w-full flex items-center justify-center space-x-2 bg-brand-600 hover:bg-brand-700 text-white font-bold py-4 rounded-2xl text-sm transition-all duration-300 shadow-lg shadow-brand-500/10 hover:shadow-brand-500/20 active:scale-[0.98]"
            >
              <span>Proceed to Checkout</span>
              <ArrowRight size={16} />
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Cart;