import { useEffect, useState } from 'react';

const ANIM_DURATION = 280; // ms — must match CSS transition duration

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
  width,
}) {
  // `visible` keeps the DOM mounted during the exit animation
  const [visible,  setVisible]  = useState(open);
  // `animate` drives the CSS entering/leaving class
  const [animate,  setAnimate]  = useState(false);

  useEffect(() => {
    if (open) {
      setVisible(true);
      // Double RAF: first frame mounts the element, second frame triggers the transition
      let raf1, raf2;
      raf1 = requestAnimationFrame(() => {
        raf2 = requestAnimationFrame(() => setAnimate(true));
      });
      return () => { cancelAnimationFrame(raf1); cancelAnimationFrame(raf2); };
    } else {
      setAnimate(false);
      const t = setTimeout(() => setVisible(false), ANIM_DURATION);
      return () => clearTimeout(t);
    }
  }, [open]);

  useEffect(() => {
    if (visible) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [visible]);

  if (!visible) return null;

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) onClose && onClose();
  };

  const backdropCls = `gn-overlay__backdrop${animate ? ' gn-overlay__backdrop--in' : ''}`;
  const panelCls    = `gn-overlay__panel${animate ? ' gn-overlay__panel--in' : ''}`;

  return (
    <div className={backdropCls} onMouseDown={handleBackdropClick}>
      <div className={panelCls} style={width ? { width } : undefined}>

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
