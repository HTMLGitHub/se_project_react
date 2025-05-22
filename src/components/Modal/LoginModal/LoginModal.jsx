import React, {useState, useEffect} from 'react';
import ModalWithForm from '../ModalWithForm/ModalWithForm';
import "../ModalWithForm/ModalWithForm.css";
import "./LoginModal.css";

export default function LoginModal({
    closeActiveModal,
    activeModal,
    onLogin,
    isSaving,
    setActiveModal,
}) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isFormValid, setIsFormValid] = useState(false);
    const [errors, setErrors] = useState({});

    const isOpen = activeModal === "login";

    useEffect(() => {
        if (activeModal === "login") {
            setEmail("");
            setPassword("");
        }
    }, [activeModal]);

    const handleSubmit = (e) => {
        e.preventDefault();
        onLogin({email, password})
        .catch(() => {
            setErrors({general: "Invalid email or password"});
        }
        );
    };

    useEffect(() => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const isEmailValid = emailRegex.test(email.trim());
        const isPasswordValid = password.trim() !== "";

        setIsFormValid(isEmailValid && isPasswordValid);
    }
    , [email, password]);

    const resetForm = () => {
        setErrors({});
        setEmail("");
        setPassword("");
    }; 

    useEffect(() => {
        if(!isOpen) resetForm();
    }, [isOpen]);


    return (
        <ModalWithForm
            title={
                <span>
                    <span style={{color: "black"}}>Log In</span>
                    {errors.general && (
                        <span style={{color: "red"}}> &nbsp;{errors.general}</span>
                    )}
                </span>
            }

            buttonText={isSaving ? "Logging in..." : "Log In"}
            activeModal={activeModal}
            modalName="login"
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
                    className={`modal__input modal__input_type_email ${errors.general ? " modal__error" : ""}`}
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
                    className={`modal__input modal__input_type_password ${errors.general ? " modal__error" : ""}`}
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