import "../pages/styles/register.css";
import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa"; // Import eye icons

const Register = () => {
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
    const [errorMessage, setErrorMessage] = useState(false);
    const [successMessage, setSuccessMessage] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        if (password === confirmPassword) {
            setSuccessMessage("Cadastro concluído com sucesso!");
        } else {
            setErrorMessage("As senhas não coincidem.");
        }
    };

    const togglePasswordVisibility = () => {
        setPasswordVisible(!passwordVisible);
    };

    const toggleConfirmPasswordVisibility = () => {
        setConfirmPasswordVisible(!confirmPasswordVisible);
    };

    return (
        <div className="Register">
            <section className="containerRegister">
                <div className="RegisterForm">
                    <h1 className="title">Register</h1>
                    <form className="formRegister" onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label className="label" htmlFor="name">Name:</label>
                            <input className="input" type="text" id="name" name="name" placeholder="Digite seu nome" required />
                        </div>
                        <div className="form-group">
                            <label htmlFor="email">Email</label>
                            <input type="email" id="email" name="email" placeholder="Digite seu email" required />
                        </div>
                        <div className="form-group">
                            <label htmlFor="password">Digite sua senha</label>
                            <input
                                type={passwordVisible ? "text" : "password"}
                                id="password"
                                name="password"
                                placeholder="Digite sua senha"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                            <span className="password-toggle" onClick={togglePasswordVisibility}>
                                {passwordVisible ? <FaEyeSlash /> : <FaEye />}
                            </span>
                        </div>
                        <div className="form-group">
                            <label htmlFor="confirmPassword">Confirme sua senha</label>
                            <input
                                type={confirmPasswordVisible ? "text" : "password"}
                                id="confirmPassword"
                                name="confirmPassword"
                                placeholder="Confirme sua senha"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                required
                            />
                            <span className="password-toggle" onClick={toggleConfirmPasswordVisibility}>
                                {confirmPasswordVisible ? <FaEyeSlash /> : <FaEye />}
                            </span>
                        </div>
                        <button className="buttonEnter" type="submit">
                            Entrar
                        </button>
                        {successMessage && <p className="success-message">{successMessage}</p>}
                        {errorMessage && <p className="error-message">{errorMessage}</p>}
                        <p className="register">
                            Já tem conta? <a href="/login">Faça o login</a>
                        </p>
                    </form>
                </div>
                <img className="banner-image" src="logo.png" />
            </section>
        </div>
    );
};

export default Register;
