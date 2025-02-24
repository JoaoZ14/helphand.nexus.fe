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
  const { ongs } = useOngs();

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
          {ongs.map((ong, index) => (
            <div className="ong-card" key={index} style={{ backgroundColor: ong.color }}>
              <img className="ong-image" src={ong.image} alt={ong.name} />
              <div className="ong-info">
                <h3>{ong.name}</h3>
                <p>{ong.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;
