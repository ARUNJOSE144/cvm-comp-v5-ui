import { useEffect } from 'react';
import { createPortal } from 'react-dom';

const Modal = ({ isOpen, toggle, className, style, centered, size, children }) => {
  useEffect(() => {
    if (isOpen) document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  if (!isOpen) return null;

  const dialogClass = [
    'gn-modal__dialog',
    className,
    size ? `gn-modal__dialog--${size}` : '',
    centered ? 'gn-modal__dialog--centered' : '',
  ].filter(Boolean).join(' ');

  return createPortal(
    <div className="gn-modal__backdrop" onClick={toggle}>
      <div className={dialogClass} style={style} onClick={e => e.stopPropagation()}>
        <div className="gn-modal__content">
          {children}
        </div>
      </div>
    </div>,
    document.body
  );
};

export default Modal;
