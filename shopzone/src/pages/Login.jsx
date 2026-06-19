import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { KeyRound, ShieldAlert } from 'lucide-react';

const Login = () => {
  const { loginAsGuest, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // Extract navigation intercept vectors if they exist
  const from = location.state?.from?.pathname || "/";

  useEffect(() => {
    if (isAuthenticated) {
      navigate(from, { replace: true });
    }
  }, [isAuthenticated, navigate, from]);

  return (
    <div className="max-w-md mx-auto px-6 py-20 pt-28">
      <div className="bg-white p-8 md:p-10 rounded-[2.5rem] border border-slate-100 shadow-xl shadow-slate-100/50 space-y-8 text-center animate-scale">
        
        {/* Animated Key Icon Badge */}
        <div className="w-16 h-16 bg-brand-50 rounded-2xl flex items-center justify-center text-brand-600 mx-auto border border-brand-100/30">
          <KeyRound size={26} className="animate-pulse" />
        </div>
        
        {/* Title & Info */}
        <div className="space-y-3">
          <h1 className="text-2xl font-black text-slate-950 tracking-tight">Authorization Portal</h1>
          <p className="text-slate-500 text-sm leading-relaxed">
            Accessing secure routes requires active instance parameters to verify tokens.
          </p>
        </div>

        {/* Redirect intercept alert warning banner */}
        {location.state?.from && (
          <div className="flex items-start space-x-3 bg-amber-50/70 border border-amber-100/50 p-4 rounded-2xl text-amber-800 text-xs font-semibold text-left">
            <ShieldAlert size={18} className="flex-shrink-0 text-amber-600 mt-0.5" />
            <div className="space-y-0.5">
              <span className="font-extrabold block">Authentication Context Required</span>
              <span className="text-amber-700/90 leading-relaxed block">
                You must establish credentials to view the structural route: <strong className="font-bold">{location.state.from.pathname}</strong>
              </span>
            </div>
          </div>
        )}

        {/* Action Button */}
        <div className="pt-2">
          <button
            onClick={loginAsGuest}
            className="w-full bg-slate-950 hover:bg-brand-600 text-white font-bold py-4 rounded-2xl text-sm transition-all duration-300 shadow-lg shadow-slate-950/10 hover:shadow-brand-500/20 active:scale-[0.98]"
          >
            Authenticate as Guest User
          </button>
        </div>
        
        <p className="text-[11px] text-slate-400 font-semibold uppercase tracking-wider leading-relaxed">
          By authenticating, you establish a mock user profile inside the state machine structure.
        </p>

      </div>
    </div>
  );
};

export default Login;