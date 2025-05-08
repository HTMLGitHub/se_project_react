import React, {useState, useEffect} from 'react';
import ModalWithForm from '../ModalWithForm/ModalWithForm';
import "../ModalWithForm/ModalWithForm.css";
import PropTypes from "prop-types";

export default function LoginModal({
    closeActiveModal,
    activeModal,
    onLogin,
    isSaving,
    setActiveModal,
}) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    useEffect(() => {
        if (activeModal === "login") {
            setEmail("");
            setPassword("");
        }
    }, [activeModal]);

    const handleSubmit = (e) => {
        e.preventDefault();
        onLogin({email, password});
    };

    return (
        <ModalWithForm
            title="Log In"
            buttonText={isSaving ? "Logging in..." : "Log In"}
            activeModal={activeModal}
            modalName="login"
            closeActiveModal={closeActiveModal}
            onSubmit={handleSubmit}
            isFormValid={true}
            altAction={
                <span className="modal__auth-text">
                    or{" "}
                    <button
                        type="button"
                        className='modal__auth-button'
                        onClick={() => {
                            closeActiveModal();
                            setActiveModal("register");
                            }
                        }
                    >
                    Sign Up
                    </button>
                </span>
            }
        >
            <label
                htmlFor='email'
                className='modal__label'
            >
                Email
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
                Password
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
        </ModalWithForm>
    );
}