import React from "react";
import {
  FaMoneyBillWave,
  FaAppleAlt,
  FaTshirt,
  FaGift,
  FaPills,
} from "react-icons/fa";
import "../pages/styles/home.css"; // Ou ajuste o caminho conforme necessário

const Home = () => {
  return (
    <div className="home">
      <section className="banner">
        <h1 className="title">O que você pode doar</h1>
        <div className="donation-options">
          <div className="donation-item money">
            <FaMoneyBillWave />
            <span className="donation-text">Dinheiro</span>
          </div>
          <div className="donation-item food">
            <FaAppleAlt />
            <span className="donation-text">Comida</span>
          </div>
          <div className="donation-item clothes">
            <FaTshirt />
            <span className="donation-text">Roupas</span>
          </div>
          <div className="donation-item toys">
            <FaGift />
            <span className="donation-text">Brinquedos</span>
          </div>
          <div className="donation-item medicine">
            <FaPills />
            <span className="donation-text">Remédios</span>
          </div>
        </div>
        {/*  <input className="search-bar" type="text" placeholder="Pesquisar ONGs..." /> */}
      </section>

      <section className="ong-section">
        <h1 className="title">ONGs em Destaque</h1>
        <div className="ong-list">
          <div className="ong-card">
            <img
              className="ong-image"
              src="https://source.unsplash.com/300x200/?help"
              alt="ONG 1"
            />
            <div className="ong-info">
              <h3>ONG Esperança</h3>
              <p>Ajudando crianças carentes desde 1995.</p>
            </div>
          </div>

          <div className="ong-card">
            <img
              className="ong-image"
              src="https://source.unsplash.com/300x200/?charity"
              alt="ONG 2"
            />
            <div className="ong-info">
              <h3>Projeto Vida</h3>
              <p>Assistência para famílias em vulnerabilidade.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
