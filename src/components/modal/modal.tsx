import { useEffect } from "react";
import ReactDOM from "react-dom";
import cn from "classnames";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import style from "./modal.module.css";
import ModalOverlay from "../modal-overlay/modal-overlay";

type TModal = {
  title?: string;
  children: JSX.Element;
  onClose: () => void;
};
const Modal = (props: TModal) => {
  const close = (event: KeyboardEvent) => {
    const { code } = event;
    if (code === "Escape") {
      props.onClose();
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", close);

    return () => {
      window.removeEventListener("keydown", close);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return ReactDOM.createPortal(
    <>
      <div className={cn(style.modal__container)}>
        <div className={cn(style.modal__header, "mt-10", "ml-10", "mr-10")}>
          <h1 className={cn("text text_type_main-large")}>{props.title}</h1>
          <div className={cn(style.close__icon)}>
            <CloseIcon type="primary" onClick={props.onClose} />
          </div>
        </div>
        {props.children}
      </div>
      <ModalOverlay closeModal={props.onClose} />
    </>,
    document.getElementById("modals")!
  );
};

export default Modal;
