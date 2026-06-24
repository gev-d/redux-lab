import type { ReactNode } from "react";

interface ModalProps {
  onClose: () => void;
  children: ReactNode;
}

/**
 * Minimal popup: a full-screen overlay with a centered panel. Clicking the
 * backdrop calls onClose; clicking inside the panel does not.
 */
export function Modal({ onClose, children }: ModalProps) {
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="modal"
        role="dialog"
        aria-modal="true"
        onClick={(event) => event.stopPropagation()}
      >
        {children}
      </div>
    </div>
  );
}
