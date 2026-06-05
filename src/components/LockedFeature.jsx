import { useState } from 'react';
import { FEATURE_FLAGS } from '../config/features';
import './LockedFeature.css';

export const lockedMessage = 'This feature is coming soon. Please contact Madhuban Nursery for availability.';

export function ComingSoonBadge() {
  if (FEATURE_FLAGS.phase2Enabled) return null;
  return <span className="coming-soon-badge">Coming Soon</span>;
}

export function LockedModal({ open, onClose, message = lockedMessage }) {
  if (!open) return null;

  return (
    <div className="locked-modal" role="dialog" aria-modal="true">
      <div className="locked-modal__backdrop" onClick={onClose} />
      <div className="locked-modal__panel">
        <span className="locked-modal__mark" aria-hidden="true">M</span>
        <h3>Coming Soon</h3>
        <p>{message}</p>
        <button className="btn btn--primary" onClick={onClose}>Okay</button>
      </div>
    </div>
  );
}

export function LockedAction({ children, className = 'btn btn--outline', enabledAction, message }) {
  const [open, setOpen] = useState(false);

  const handleClick = () => {
    if (FEATURE_FLAGS.phase2Enabled) {
      enabledAction?.();
      return;
    }
    setOpen(true);
  };

  return (
    <>
      <button type="button" className={className} onClick={handleClick}>
        {children}
        <ComingSoonBadge />
      </button>
      <LockedModal open={open} onClose={() => setOpen(false)} message={message} />
    </>
  );
}
