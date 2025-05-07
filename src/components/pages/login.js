import "../pages/styles/login.css";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useState } from "react";



const Login = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [password, setPassword] = useState("");
  
  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  return (
    <div className="login">
      <section className="containerLogin">
        <div className="loginForm">
          <h1 className="title">LOGIN</h1>
          <form className="formLogin">
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Digite seu email"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="password">Senha</label>
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
            <button className="buttonEnter" type="submit">
              Entrar
            </button>
            <p className="register">
              Não tem conta? <a href="/register">Cadastre-se</a>
            </p>
          </form>
        </div>
        <img className="banner-image" src="logo.png" />
      </section>
    </div>
  );
};
export default Login;
