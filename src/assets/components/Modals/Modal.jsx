import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import "./modal.scss";

function Modal({ open, children, onClose, onBackdropClicked }) {
  const dialog = useRef();

  useEffect(() => {
    if (open) {
      dialog.current.showModal();
    } else {
      dialog.current.close();
    }
  }, [open]);

  const handleBackdropClick = (event) => {
    if (event.target === dialog.current) {
      onBackdropClicked();
    }
  };

  return createPortal(
    <dialog
      className="modal"
      ref={dialog}
      onClose={onClose}
      onClick={handleBackdropClick}
    >
      {open ? children : null}
    </dialog>,
    document.getElementById("modal")
  );
}

export default Modal;
