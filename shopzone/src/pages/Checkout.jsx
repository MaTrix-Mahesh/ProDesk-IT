import { useState } from 'react';
import { useCart } from '../context/CartContext';
import { CreditCard, CheckCircle2, ShoppingBag, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const Checkout = () => {
  const { cart, getCartTotal, clearCart } = useCart();
  const [orderComplete, setOrderComplete] = useState(false);
  const [orderId, setOrderId] = useState('');

  const handleProcessOrder = (e) => {
    e.preventDefault();
    setOrderComplete(true);
    setOrderId(Math.random().toString(36).substring(2, 11).toUpperCase());
    clearCart();
  };

  if (orderComplete) {
    return (
      <div className="max-w-md mx-auto my-20 text-center p-10 bg-white border border-slate-100 rounded-[2.5rem] shadow-xl shadow-slate-100/50 space-y-8 animate-scale pt-24">
        
        <div className="w-20 h-20 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mx-auto border border-emerald-100/50">
          <CheckCircle2 size={36} className="animate-bounce" />
        </div>
        
        <div className="space-y-3">
          <h2 className="text-2xl font-black text-slate-950 tracking-tight">Order Confirmed</h2>
          <p className="text-slate-500 text-sm md:text-base leading-relaxed">
            The state payload has successfully resolved with our transaction mock engine handler.
          </p>
        </div>

        <div className="p-4 bg-slate-50 border border-slate-100 rounded-2xl space-y-1">
          <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block">Reference ID</span>
          <span className="font-mono font-bold text-slate-800 text-sm">{orderId}</span>
        </div>

        <div className="pt-2">
          <Link
            to="/shop"
            className="w-full inline-flex items-center justify-center space-x-2 bg-slate-950 hover:bg-brand-600 text-white font-bold py-4 rounded-2xl transition-all duration-300 shadow-md"
          >
            <span>Continue Shopping</span>
            <ArrowRight size={16} />
          </Link>
        </div>

      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-6 py-12 space-y-8 pt-24">
      
      <div>
        <h1 className="text-3xl font-black text-slate-950 tracking-tight">Checkout Manifest</h1>
        <p className="text-sm text-slate-500 mt-1">Provide your details to authorize this simulated transaction.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-start">
        
        {/* Checkout Processing Form */}
        <div className="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-sm space-y-8">
          <h2 className="text-lg font-extrabold text-slate-950 flex items-center space-x-2.5">
            <CreditCard size={20} className="text-brand-600" />
            <span>Payment Allocation</span>
          </h2>
          
          <form onSubmit={handleProcessOrder} className="space-y-5">
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1.5">First Name</label>
                <input 
                  type="text" 
                  required 
                  defaultValue="Mahesh" 
                  className="w-full bg-slate-50 border border-slate-200 focus:border-brand-500 focus:bg-white p-3.5 rounded-2xl text-sm outline-none transition-all" 
                />
              </div>
              <div>
                <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1.5">Last Name</label>
                <input 
                  type="text" 
                  required 
                  defaultValue="Sha" 
                  className="w-full bg-slate-50 border border-slate-200 focus:border-brand-500 focus:bg-white p-3.5 rounded-2xl text-sm outline-none transition-all" 
                />
              </div>
            </div>

            <div>
              <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1.5">Delivery Destination Matrix</label>
              <input 
                type="text" 
                required 
                placeholder="123 Production Lane, Vercel Hub" 
                className="w-full bg-slate-50 border border-slate-200 focus:border-brand-500 focus:bg-white p-3.5 rounded-2xl text-sm outline-none transition-all" 
              />
            </div>

            {/* Immersive Credit Card Fields */}
            <div className="space-y-4 pt-2 border-t border-slate-50">
              <span className="block text-[10px] font-black text-slate-400 uppercase tracking-widest">Card Parameters (Simulated)</span>
              
              <div>
                <input 
                  type="text" 
                  required 
                  placeholder="Card Number: 4111 •••• •••• 1111" 
                  className="w-full bg-slate-50 border border-slate-200 focus:border-brand-500 focus:bg-white p-3.5 rounded-2xl text-sm outline-none transition-all font-mono" 
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <input 
                  type="text" 
                  required 
                  placeholder="MM/YY" 
                  className="w-full bg-slate-50 border border-slate-200 focus:border-brand-500 focus:bg-white p-3.5 rounded-2xl text-sm outline-none transition-all font-mono" 
                />
                <input 
                  type="password" 
                  required 
                  maxLength="3"
                  placeholder="CVV" 
                  className="w-full bg-slate-50 border border-slate-200 focus:border-brand-500 focus:bg-white p-3.5 rounded-2xl text-sm outline-none transition-all font-mono" 
                />
              </div>
            </div>

            <div className="p-4.5 bg-slate-50 rounded-2xl space-y-1.5 border border-dashed border-slate-200 text-xs text-slate-500">
              <p className="font-extrabold text-slate-700">💳 Simulated Sandbox Engine</p>
              <p className="leading-relaxed">Form submission cleans input parameters and dispatches mock handlers instantly.</p>
            </div>

            <button
              type="submit"
              className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-4 rounded-2xl text-sm transition-all duration-300 shadow-md shadow-emerald-600/10 hover:shadow-emerald-600/20 active:scale-[0.98]"
            >
              Authorize Remittance (₹{(getCartTotal() * 83).toLocaleString('en-IN', { maximumFractionDigits: 2, minimumFractionDigits: 2 })})
            </button>

          </form>
        </div>

        {/* Side-panel structural visual review items inside basket */}
        <div className="bg-slate-950 text-slate-100 p-8 rounded-[2rem] space-y-6 shadow-xl">
          <h2 className="text-lg font-extrabold flex items-center space-x-2.5 border-b border-slate-900 pb-4">
            <ShoppingBag size={20} className="text-brand-400" />
            <span>Manifest Line Review</span>
          </h2>
          
          <div className="divide-y divide-slate-900 max-h-[300px] overflow-y-auto pr-2 space-y-3">
            {cart.map((item) => (
              <div key={item.id} className="flex justify-between items-center pt-3 text-sm">
                <div className="min-w-0 flex-grow pr-4">
                  <p className="font-bold text-slate-200 truncate">{item.title}</p>
                  <p className="text-xs text-slate-500 font-semibold uppercase tracking-wider">Qty: {item.quantity}</p>
                </div>
                <span className="font-mono font-semibold text-slate-300">₹{(item.price * item.quantity * 83).toLocaleString('en-IN', { maximumFractionDigits: 2, minimumFractionDigits: 2 })}</span>
              </div>
            ))}
          </div>

          <div className="border-t border-slate-900 pt-5 flex justify-between items-center text-base font-extrabold">
            <span>Aggregate Due</span>
            <span className="text-brand-400 font-mono text-2xl">₹{(getCartTotal() * 83).toLocaleString('en-IN', { maximumFractionDigits: 2, minimumFractionDigits: 2 })}</span>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Checkout;