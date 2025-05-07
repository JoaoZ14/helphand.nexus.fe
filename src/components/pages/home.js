import React from "react";
import {
  FaMoneyBillWave,
  FaAppleAlt,
  FaTshirt,
  FaGift,
  FaPills,
} from "react-icons/fa";
import { useOngs } from '../../context/OngsContext';
import "../pages/styles/home.css";

const Home = () => {
  const { ongs, loading, error } = useOngs();

  return (
    <div className="home">
      <section className="banner">
        <img className="banner-image" src="imgDonateOng.jpeg" alt="Banner" />
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
      </section>

      <section className="ong-section">
        <div className="title_div">
          <h1 className="title_Destaque">ONGs em Destaque</h1>
        </div>
        <div className="ong-list">
          {loading ? (
            <div className="loading">Carregando ONGs...</div>
          ) : error ? (
            <div className="error">{error}</div>
          ) : (
            ongs.map((ong) => (
              <div className="ong-card" key={ong.id}>
                <img className="ong-image" src={ong.imagemUrl} alt={ong.nome} />
                <div className="ong-info">
                  <h3>{ong.nome}</h3>
                  <p>{ong.descricao}</p>
                </div>
              </div>
            ))
          )}
        </div>
      </section>
    </div>
  );
};

export default Home;
