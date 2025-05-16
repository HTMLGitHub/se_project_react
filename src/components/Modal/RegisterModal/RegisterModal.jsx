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
    const [isFormValid, setIsFormValid] = useState(false);
    const [errors, setErrors] = useState({});
    
    useEffect(() => {
        if (activeModal === "register") {
            setName("");
            setAvatar("");
            setEmail("");
            setPassword("");
        }
    }, [activeModal]);

    function handleChange(e) {
        const {name, value, validationMessage} = e.target;
        switch (name) {
            case "email":
                setEmail(value);
                break;
            case "password":
                setPassword(value);
                break;
            case "name":
                setName(value);
                break;
            case "avatar":
                setAvatar(value);
                break;
            default:
                break;
        }

        // Update error messages
        setErrors((prev) => ({
            ...prev,
            [name]: validationMessage,
        }));
    }

    useEffect(() => {
        const hasErrors = Object.values(errors).some((error) => error);
        const requiredFields = email.trim() !== "" && password.trim() !== "";
        setIsFormValid(!hasErrors && requiredFields);
    }, [email, password, name, avatar, errors]);

    const handleSubmit = (e) => {
        e.preventDefault();

        const payload = {
            email,
            password
        };

        if (name.trim()){ payload.name = name; }
        if (avatar.trim()){ payload.avatar = avatar; }

        if (isFormValid) { onRegister(payload); }        
    }

    return (
        <ModalWithForm
            title="Sign Up"
            buttonText={isSaving ? "Registering..." : "Sign Up"}
            activeModal={activeModal}
            modalName="register"
            closeActiveModal={closeActiveModal}
            onSubmit={handleSubmit}
            isFormValid={isFormValid}
            altAction={
                <span className="modal__auth-text">
                    or{" "}
                    <button
                        type="button"
                        className='modal__auth-button'
                        onClick={() => {
                            closeActiveModal();
                            setActiveModal("login");
                            }
                        }
                    >
                    Log In
                    </button>
                </span>
            }
        >
            <label 
                htmlFor='email'
                className='modal__label'
            >
                Email*
                <input
                    name="email"
                    type="email"
                    className="modal__input modal__input_type_email"
                    id="email"
                    placeholder="Email"
                    required
                    onChange={handleChange}
                    value={email}
                />
            </label>
            <label 
                htmlFor='password'
                className='modal__label'
            >
                Password*
                <input
                    name="password"
                    type="password"
                    className="modal__input modal__input_type_password"
                    id="password"
                    placeholder="Password"
                    required
                    onChange={handleChange}
                    value={password}
                />
            </label>
            <label 
                htmlFor='name'
                className='modal__label'
            >
                Name
                <input
                    name="name"
                    type="text"
                    className="modal__input modal__input_type_name"
                    id="name"
                    placeholder="Name"
                    onChange={handleChange}
                    value={name}
                />
            </label>
            <label 
                htmlFor='avatar'
                className='modal__label'
            >
                Avatar
                <input
                    name="avatar"
                    type="url"
                    className="modal__input modal__input_type_avatar"
                    id="avatar"
                    placeholder="Avatar URL"
                    onChange={handleChange}
                    value={avatar}
                />
            </label>
        </ModalWithForm>
    );
}

RegisterModal.propTypes = {
    closeActiveModal: PropTypes.func.isRequired,
    activeModal: PropTypes.string.isRequired,
    onRegister: PropTypes.func.isRequired,
    isSaving: PropTypes.bool.isRequired,
};