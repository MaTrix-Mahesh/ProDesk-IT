const ConfirmationModal = ({ open, title, message, confirmText = 'Delete', cancelText = 'Cancel', onConfirm, onCancel, loading = false }) => {
  if (!open) return null;

  return (
    <div className="modal-overlay" onClick={onCancel}>
      <div className="modal-panel max-w-sm" onClick={(e) => e.stopPropagation()}>
        <div className="px-6 py-5 text-center">
          {/* Warning icon */}
          <div className="relative inline-block mb-4">
            <div className="absolute inset-0 bg-rose-500/10 rounded-full blur-xl scale-150" />
            <div className="relative w-16 h-16 bg-gradient-to-br from-rose-50 to-red-50 border border-rose-100 rounded-full flex items-center justify-center">
              <svg className="w-8 h-8 text-rose-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
            </div>
          </div>

          <h3 className="text-lg font-bold text-slate-900 mb-2">{title}</h3>
          <p className="text-sm text-slate-500 mb-6 leading-relaxed">{message}</p>

          {/* Actions */}
          <div className="flex items-center justify-center gap-3">
            <button
              type="button"
              className="btn btn-secondary !px-5"
              onClick={onCancel}
              disabled={loading}
            >
              {cancelText}
            </button>
            <button
              type="button"
              className="btn btn-danger !px-5"
              onClick={onConfirm}
              disabled={loading}
            >
              {loading ? (
                <>
                  <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  Deleting...
                </>
              ) : (
                <>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                  {confirmText}
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;