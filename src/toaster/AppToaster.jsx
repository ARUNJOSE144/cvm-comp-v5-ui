import { Toaster, toast } from 'react-hot-toast';
import { Bell } from 'lucide-react';

const _callbacks = new Map();

function renderToast(t) {
  let heading, description, actionLabel, cbId;

  try {
    const parsed = JSON.parse(t.message);
    if (parsed.__gn) {
      ({ heading, description, actionLabel, cbId } = parsed);
    }
  } catch {
    // plain string from toast.success() / toast.error()
  }

  if (!heading) {
    heading     = t.type === 'success' ? 'Success' : t.type === 'error' ? 'Error' : 'Notification';
    description = typeof t.message === 'string' ? t.message : '';
  }

  const handleAction = () => {
    if (cbId && _callbacks.has(cbId)) {
      _callbacks.get(cbId)();
      _callbacks.delete(cbId);
    }
    toast.remove(t.id);
  };

  return (
    <div className="gn-toast">
      <div className="gn-toast__body">
        {/* icon row */}
        <div className="gn-toast__top-row">
          <Bell size={13} strokeWidth={1.5} color="#6D6D6D" />
          <button className="gn-toast__close" onClick={() => toast.remove(t.id)}>×</button>
        </div>

        {/* heading + description */}
        <div className="gn-toast__content">
          <span className="gn-toast__heading">{heading}</span>
          {description && <span className="gn-toast__description">{description}</span>}
        </div>

        {/* optional action link */}
        {actionLabel && (
          <button className="gn-toast__action" onClick={handleAction}>
            {actionLabel}
          </button>
        )}
      </div>

      {/* progress bar */}
      <div className="gn-toast__progress-track">
        <div className="gn-toast__progress-bar" />
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

/**
 * Show a structured notification toast.
 * @param {{ heading: string, description?: string, actionLabel?: string, onAction?: () => void, duration?: number }} opts
 */
export const gnToast = ({ heading, description, actionLabel, onAction, duration } = {}) => {
  const id = `gnt-${Date.now()}`;
  if (onAction) _callbacks.set(id, onAction);
  toast(
    JSON.stringify({ __gn: 1, heading, description: description || '', actionLabel: actionLabel || null, cbId: onAction ? id : null }),
    { id, duration: duration || 4000 }
  );
};
