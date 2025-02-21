import React from "react";
import '../pages/styles/home.css';  // Ou ajuste o caminho conforme necessário


const Home = () => {
  return (
    <div className="home"> 
      <section className="banner"> 
        <h1 className="title">Ajude quem precisa!</h1>
        <input className="search-bar" type="text" placeholder="Pesquisar ONGs..." /> 
      </section>

      <section className="ong-section"> 
        <h2>ONGs em Destaque</h2>
        <div className="ong-list">
          <div className="ong-card"> 
            <img className="ong-image" src="https://source.unsplash.com/300x200/?help" alt="ONG 1" />
            <div className="ong-info"> 
              <h3>ONG Esperança</h3>
              <p>Ajudando crianças carentes desde 1995.</p>
            </div>
          </div>

          <div className="ong-card">
            <img className="ong-image" src="https://source.unsplash.com/300x200/?charity" alt="ONG 2" />
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
