import style from "./modal-overlay.module.css";
import cn from "classnames";
import PropTypes from "prop-types";

const ModalOverlay = ({ closeModal }) => (
  <section className={cn(style.modal__overlay)} onClick={closeModal}></section>
);

ModalOverlay.propTypes = {
  closeModal: PropTypes.func,
};

export default ModalOverlay;
