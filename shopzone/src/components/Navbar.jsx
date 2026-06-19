
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { ShoppingBag, User, LogOut, Phone, Home, Layers } from 'lucide-react';

const Navbar = () => {
  const { getCartCount } = useCart();
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const cartCount = getCartCount();

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="fixed top-0 left-0 right-0 h-16 bg-white/75 backdrop-blur-xl border-b border-slate-100 z-50 flex items-center justify-between px-6 md:px-12 transition-all duration-300">
      
      {/* Brand Identity */}
      <Link to="/" className="text-xl font-bold tracking-tight flex items-center space-x-2.5 group">
        <span className="bg-gradient-to-tr from-brand-600 to-indigo-600 text-white px-3 py-1 rounded-xl shadow-md shadow-brand-500/25 group-hover:scale-105 transition-transform duration-300">
          SZ
        </span>
        <span className="hidden sm:inline font-black text-slate-950 tracking-tight bg-gradient-to-r from-slate-900 to-slate-800 bg-clip-text text-transparent">
          ShopZone
        </span>
      </Link>

      {/* Navigation Links */}
      <div className="flex items-center space-x-1.5 sm:space-x-3 text-sm font-semibold">
        <Link 
          to="/" 
          className={`flex items-center space-x-2 px-3.5 py-2 rounded-xl transition-all duration-300 ${
            isActive('/') 
              ? 'bg-brand-50 text-brand-600' 
              : 'text-slate-600 hover:bg-slate-50 hover:text-slate-950'
          }`}
        >
          <Home size={16} />
          <span className="hidden md:inline">Home</span>
        </Link>
        
        <Link 
          to="/shop" 
          className={`flex items-center space-x-2 px-3.5 py-2 rounded-xl transition-all duration-300 ${
            isActive('/shop') 
              ? 'bg-brand-50 text-brand-600' 
              : 'text-slate-600 hover:bg-slate-50 hover:text-slate-950'
          }`}
        >
          <Layers size={16} />
          <span className="hidden md:inline">Shop</span>
        </Link>
        
        <Link 
          to="/contact" 
          className={`flex items-center space-x-2 px-3.5 py-2 rounded-xl transition-all duration-300 ${
            isActive('/contact') 
              ? 'bg-brand-50 text-brand-600' 
              : 'text-slate-600 hover:bg-slate-50 hover:text-slate-950'
          }`}
        >
          <Phone size={16} />
          <span className="hidden md:inline">Contact</span>
        </Link>
      </div>

      {/* Utility/User Profile items */}
      <div className="flex items-center space-x-4">
        
        {/* Shopping Cart Button */}
        <Link 
          to="/cart" 
          className={`relative p-2.5 rounded-xl transition-all duration-300 flex items-center justify-center ${
            isActive('/cart') 
              ? 'bg-brand-50 text-brand-600' 
              : 'text-slate-700 hover:bg-slate-50 hover:text-slate-950'
          }`}
        >
          <ShoppingBag size={20} />
          {cartCount > 0 && (
            <span key={cartCount} className="absolute -top-1 -right-1 bg-brand-600 text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center border-2 border-white shadow-sm animate-scale">
              {cartCount}
            </span>
          )}
        </Link>

        {/* Authentication State button */}
        {user ? (
          <div className="flex items-center space-x-3 pl-3 border-l border-slate-100">
            <div className="flex flex-col text-right hidden lg:flex">
              <span className="text-xs font-bold text-slate-900 truncate max-w-[120px]">
                {user.name}
              </span>
              <span className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider">
                {user.role}
              </span>
            </div>
            <button
              onClick={() => { logout(); navigate('/'); }}
              className="p-2.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition-all duration-300"
              title="Logout from Session"
            >
              <LogOut size={18} />
            </button>
          </div>
        ) : (
          <Link
            to="/login"
            className="flex items-center space-x-2 text-sm font-bold text-white bg-slate-950 hover:bg-brand-600 px-4 py-2.5 rounded-xl transition-all duration-300 shadow-lg shadow-slate-950/10 hover:shadow-brand-500/20 active:scale-[0.98]"
          >
            <User size={15} />
            <span>Login</span>
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;