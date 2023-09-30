import React, { useRef } from "react";
import clsx from "clsx";
import { useOnClickOutside } from "usehooks-ts";
type Props = {
  children: React.ReactNode;
  open: boolean;
  disableClickOutside?: boolean;
  //add onClose event so that we can close the modal from inside the component
  onClose(): void;
};

const Modal = ({ children, open, disableClickOutside, onClose }: Props) => {
  const ref = useRef(null);
  useOnClickOutside(ref, () => {
    if (!disableClickOutside) {
      onClose();
    }
  });

  const modalClass = clsx({
    "modal modal-middle": true,
    "modal-open": open,
  });
  return (
    <div className={modalClass}>
      <div className="modal-box max-w-sm" ref={ref}>
        {children}
      </div>
    </div>
  );
};

export default Modal;
