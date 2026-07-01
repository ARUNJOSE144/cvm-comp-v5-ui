import { useEffect } from 'react';

export default function Overlay({
  open = false,
  onClose,
  title,
  subtitle,
  children,
  onCancel,
  onProceed,
  cancelLabel  = 'Cancel',
  proceedLabel = 'Proceed',
  showFooter   = true,
}) {
  // Lock body scroll while open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  if (!open) return null;

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) onClose && onClose();
  };

  return (
    <div className="gn-overlay__backdrop" onMouseDown={handleBackdropClick}>
      <div className="gn-overlay__panel">

        {/* Header */}
        <div className="gn-overlay__header">
          <span className="gn-overlay__title">{title}</span>
          <button className="gn-overlay__close" onClick={() => onClose && onClose()} aria-label="Close">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M3 3L13 13M13 3L3 13" stroke="#1D1D1D" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
          </button>
        </div>

        {/* Subtitle bar */}
        {subtitle && (
          <div className="gn-overlay__subtitle-bar">
            <span className="gn-overlay__subtitle">{subtitle}</span>
          </div>
        )}

        {/* Body */}
        <div className="gn-overlay__body">
          {children}
        </div>

        {/* Footer */}
        {showFooter && (
          <div className="gn-overlay__footer">
            <button
              type="button"
              className="gn-overlay__btn gn-overlay__btn--cancel"
              onClick={() => onCancel ? onCancel() : onClose && onClose()}
            >
              {cancelLabel}
            </button>
            <button
              type="button"
              className="gn-overlay__btn gn-overlay__btn--proceed"
              onClick={() => onProceed && onProceed()}
            >
              {proceedLabel}
            </button>
          </div>
        )}

      </div>
    </div>
  );
}
