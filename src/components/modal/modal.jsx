import { useEffect } from "react";
import ReactDOM from "react-dom";
import cn from "classnames";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypes from "prop-types";
import style from "./modal.module.css";
import ModalOverlay from "../modal-overlay/modal-overlay";
import { useDispatch } from "react-redux";
const Modal = (props) => {
  const dispatch = useDispatch();

  const closeModal = () => {
    dispatch({ type: "CLOSE_MODAL_INGREDIENT_DETAILS" });
    dispatch({ type: "CLOSE_MODAL_ORDER_DETAILS" });
  };

  const close = (event) => {
    const { code } = event;
    if (code === "Escape") {
      closeModal();
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
            <CloseIcon type="primary" onClick={closeModal} />
          </div>
        </div>
        {props.children}
      </div>
      <ModalOverlay closeModal={closeModal} />
    </>,
    document.getElementById("modals")
  );
};

Modal.propTypes = {
  title: PropTypes.string,
  children: PropTypes.element,
};

export default Modal;
