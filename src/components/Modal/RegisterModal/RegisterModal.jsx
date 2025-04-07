import React, {useState, useEffect} from 'react';
import ModalWithForm from '../ModalWithForm/ModalWithForm';
import "../ModalWithForm/ModalWithForm.css";
import PropTypes from "prop-types";

export default function RegisterModal({
    closeActiveModal, 
    activeModal,
    onRegister,
    isSaving,
    setActiveModal,}) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [avatar, setAvatar] = useState("");    
    //const [isFormValid, setIsFormValid] = useState(false);
    
    useEffect(() => {
        if (activeModal === "register") {
            setName("");
            setAvatar("");
            setEmail("");
            setPassword("");
        }
    }, [activeModal]);

    const handleSubmit = (e) => {
        e.preventDefault();
        onRegister({name, avatar, email, password});
    }

    return (
        <ModalWithForm
            title="Sign Up"
            buttonText={isSaving ? "Registering..." : "Next"}
            activeModal={activeModal}
            modalName="register"
            closeActiveModal={closeActiveModal}
            onSubmit={handleSubmit}
            isFormValid={true}
        >
            <label 
                htmlFor='email'
                className='modal__label'
            >
                Email*
                <input
                    type="email"
                    className="modal__input modal__input_type_email"
                    id="email"
                    placeholder="Email"
                    required
                    onChange={(e) => {
                        setEmail(e.target.value);
                    }}
                    value={email}
                />
            </label>
            <label 
                htmlFor='password'
                className='modal__label'
            >
                Password*
                <input
                    type="password"
                    className="modal__input modal__input_type_password"
                    id="password"
                    placeholder="Password"
                    required
                    onChange={(e) => {
                        setPassword(e.target.value);
                    }}
                    value={password}
                />
            </label>
            <label 
                htmlFor='name'
                className='modal__label'
            >
                Name
                <input
                    type="text"
                    className="modal__input modal__input_type_name"
                    id="name"
                    placeholder="Name"
                    onChange={(e) => {
                        setName(e.target.value);
                    }}
                    value={name}
                />
            </label>
            <label 
                htmlFor='avatar'
                className='modal__label'
            >
                Avatar
                <input
                    type="url"
                    className="modal__input modal__input_type_avatar"
                    id="avatar"
                    placeholder="Avatar URL"
                    onChange={(e) => {
                        setAvatar(e.target.value);
                    }}
                    value={avatar}
                />
            </label>

            <div className='modal__switch-wrapper'>
                <span className='modal__switch-text'>or</span>
                <button
                    type="button"
                    className='modal__switch-button'
                    onClick={() => {
                        closeActiveModal();
                        setActiveModal("login");
                        }
                    }
                >
                    Register
                </button>
            </div>
        </ModalWithForm>
    );
}

RegisterModal.propTypes = {
    closeActiveModal: PropTypes.func.isRequired,
    activeModal: PropTypes.string.isRequired,
    onRegister: PropTypes.func.isRequired,
    isSaving: PropTypes.bool.isRequired,
};