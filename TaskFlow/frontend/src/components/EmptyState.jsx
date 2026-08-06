const EmptyState = ({ icon = '📭', title, message, actionLabel, onAction }) => {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-6 text-center animate-fade-in">
      <div className="relative mb-6">
        <div className="absolute inset-0 bg-primary-500/10 rounded-full blur-2xl scale-150" />
        <div className="relative w-20 h-20 bg-gradient-to-br from-primary-50 to-violet-50 border border-primary-100 rounded-3xl flex items-center justify-center text-4xl shadow-inner">
          {icon}
        </div>
      </div>

      <h3 className="text-lg font-bold text-slate-900 mb-2">{title}</h3>
      <p className="text-sm text-slate-500 max-w-sm mb-6">{message}</p>

      {actionLabel && onAction && (
        <button onClick={onAction} className="btn btn-primary">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
          </svg>
          {actionLabel}
        </button>
      )}
    </div>
  );
};

export const ErrorState = ({ message, onRetry }) => {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-6 text-center animate-fade-in">
      <div className="relative mb-6">
        <div className="absolute inset-0 bg-rose-500/10 rounded-full blur-2xl scale-150" />
        <div className="relative w-20 h-20 bg-gradient-to-br from-rose-50 to-red-50 border border-rose-100 rounded-3xl flex items-center justify-center text-4xl shadow-inner">
          ⚠️
        </div>
      </div>

      <h3 className="text-lg font-bold text-slate-900 mb-2">Something went wrong</h3>
      <p className="text-sm text-slate-500 max-w-sm mb-6">
        {message || 'We encountered an unexpected error. Please try again.'}
      </p>

      {onRetry && (
        <button onClick={onRetry} className="btn btn-secondary">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
          Try Again
        </button>
      )}
    </div>
  );
};

export default EmptyState;