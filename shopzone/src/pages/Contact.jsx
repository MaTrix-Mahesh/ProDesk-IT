import { useState } from 'react';
import { Send, CheckCircle } from 'lucide-react';

const Contact = () => {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    e.target.reset();
  };

  return (
    <div className="max-w-md mx-auto px-6 py-20 pt-28">
      <div className="bg-white p-8 md:p-10 rounded-[2.5rem] border border-slate-100 shadow-xl shadow-slate-100/50 space-y-8 animate-scale">
        
        {/* Title */}
        <div className="text-center space-y-3">
          <h1 className="text-3xl font-black text-slate-950 tracking-tight">Get in Touch</h1>
          <p className="text-slate-500 text-sm leading-relaxed">
            Our customer engagement team typically intercepts payload items within 2 hours.
          </p>
        </div>

        {submitted ? (
          <div className="p-6 bg-emerald-50/80 border border-emerald-100 rounded-3xl text-center space-y-3 animate-scale">
            <CheckCircle size={32} className="text-emerald-600 mx-auto animate-pulse" />
            <h3 className="font-extrabold text-emerald-950 text-sm">Message Cataloged</h3>
            <p className="text-emerald-600 text-xs leading-relaxed">
              The parameters were submitted to the service loop asynchronously.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5">
            
            <div>
              <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1.5">Full Name</label>
              <input
                type="text"
                required
                placeholder="Jane Doe"
                className="w-full bg-slate-50 border border-slate-200 focus:border-brand-500 focus:bg-white p-3.5 rounded-2xl text-sm outline-none transition-all"
              />
            </div>
            
            <div>
              <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1.5">Email Address</label>
              <input
                type="email"
                required
                placeholder="jane.doe@domain.com"
                className="w-full bg-slate-50 border border-slate-200 focus:border-brand-500 focus:bg-white p-3.5 rounded-2xl text-sm outline-none transition-all"
              />
            </div>
            
            <div>
              <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1.5">Message Stream</label>
              <textarea
                required
                rows="4"
                placeholder="Describe project details or assistance targets..."
                className="w-full bg-slate-50 border border-slate-200 focus:border-brand-500 focus:bg-white p-3.5 rounded-2xl text-sm outline-none transition-all resize-none leading-relaxed"
              ></textarea>
            </div>
            
            <div className="pt-2">
              <button
                type="submit"
                className="w-full flex items-center justify-center space-x-2 bg-slate-950 hover:bg-brand-600 text-white font-bold py-4 rounded-2xl text-sm transition-all duration-300 shadow-lg shadow-slate-950/10 hover:shadow-brand-500/20 active:scale-[0.98]"
              >
                <Send size={15} />
                <span>Dispatch Payload</span>
              </button>
            </div>

          </form>
        )}
        
      </div>
    </div>
  );
};

export default Contact;