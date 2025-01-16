import "./ModalWithForm.css";
import closeIcon from "../../assets/close.png";

export default function ModalWithForm({
  children,
  title,
  buttonText,
  activeModal,
  modalName,
  closeActiveModal,
}) {
  return (
    <div className={`modal ${activeModal === modalName && "modal_opened"}`}>
      <div className="modal__container">
        <h2 className="modal__title">{title}</h2>
        <button
          onClick={closeActiveModal}
          type="button"
          className="modal__close"
        >
          <img src={closeIcon} alt="close" className="modal__close-icon" />
        </button>
        <form className="modal__form">
          {children}
          <button type="submit" className="modal__submit">
            {buttonText}
          </button>
        </form>
      </div>
    </div>
  );
}
