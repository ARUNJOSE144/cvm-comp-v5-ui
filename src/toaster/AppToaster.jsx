import { Toaster, toast } from 'react-hot-toast';

function renderToast(t) {
  const mod = t.type === 'error' ? 'toast-wrap--error' : 'toast-wrap--success';
  return (
    <div className={`toast-wrap ${mod}`}>
      <div className="toast-body">
        <span className="toast-message">{t.message}</span>
        <button className="toast-close" onClick={() => toast.remove(t.id)}>✕</button>
      </div>
      <div className="toast-progress-track">
        <div className="toast-progress-bar" />
      </div>
    </div>
  );
}

export default function AppToaster() {
  return (
    <Toaster position="top-right" toastOptions={{ duration: 4000 }}>
      {renderToast}
    </Toaster>
  );
}
