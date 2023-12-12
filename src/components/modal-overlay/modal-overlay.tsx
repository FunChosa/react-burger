import style from "./modal-overlay.module.css";
import cn from "classnames";

type TModalOverlay = {
  closeModal: () => void;
};

const ModalOverlay = ({ closeModal }: TModalOverlay) => (
  <section className={cn(style.modal__overlay)} onClick={closeModal}></section>
);

export default ModalOverlay;
