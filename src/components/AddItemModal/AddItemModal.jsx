import "./AddItemModal.css";
import ModalWithForm from "../ModalWithForm/ModalWithForm";

export default function AddItemModal({ closeActiveModal, activeModal }) {
    return (
    <ModalWithForm
      title="New Garment"
      buttonText="Add garment"
      activeModal={activeModal}
      modalName="add-garment"
      closeActiveModal={closeActiveModal}
    >
      <label htmlFor="name" className="modal__label">
        Name{" "}
        <input
          type="text"
          className="modal__input"
          id="name"
          placeholder="Name"
        />
      </label>

      <label htmlFor="imageURL" className="modal__label">
        Image{" "}
        <input
          type="url"
          className="modal__input"
          id="imageURL"
          placeholder="Image URL"
        />
      </label>
      <fieldset className="modal__radio-buttons">
        <legend className="modal__legend">Select the weather type</legend>
        <div className="modal__radio-button">
          <label htmlFor="hot" className="modal__label modal__label_type_radio">
            <input type="radio" name="weather" id="hot" value="Hot" />
            Hot
          </label>
        </div>
        <div className="modal__radio-button">
          <label
            htmlFor="warm"
            className="modal__label modal__label_type_radio"
          >
            <input type="radio" name="weather" id="warm" value="Warm" />
            Warm
          </label>
        </div>
        <div className="modal__radio-button">
          <label
            htmlFor="cold"
            className="modal__label modal__label_type_radio"
          >
            <input type="radio" name="weather" id="cold" value="Cold" />
            Cold
          </label>
        </div>
      </fieldset>
    </ModalWithForm>
  );
}
