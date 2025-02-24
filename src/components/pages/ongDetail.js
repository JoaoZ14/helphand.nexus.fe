import React from "react";
import { useParams } from "react-router-dom";
import { useOngs } from "../../context/OngsContext";
import "./styles/detailsOng.css";

const OngDetail = () => {
  const { id } = useParams();
  const { ongs } = useOngs();
  const ong = ongs.find((o) => o.id === parseInt(id));

  if (!ong) {
    return <div>ONG not found</div>;
  }

  return (
    <div className="ong-detail">
      <img src={ong.image} alt={ong.name} className="ong-detail-image" />
      <div className="ong-detail-info">
        <h2>{ong.name}</h2>
        <p>{ong.description}</p>
        <h3>O que nós Precisamos:</h3>
      </div>
      <div className="ong-detail-address">
        <h3>Localização:</h3>
        <iframe
          width="600"
          height="450"
          style={{ border: 0 }}
          loading="lazy"
          allowFullScreen
          src={`https://www.google.com/maps/embed/v1/place?key=AIzaSyCzEjUnsXLjJ9DMWV6NwEPk9LSicJo8wlY&q=${ong.address.cep}`}
        ></iframe>
        <p>
          {ong.address.street}, {ong.address.city} - {ong.address.state}
        </p>
      </div>
      <div className="ong-detail-donate">
        <h3>Vai doar via PIX?</h3>
        <p>Aqui está a nossa chave PIX:</p>
        <p>{ong.pix}</p>
        <p>Ou temos aqui o QR code:</p>
        <img
          src={`https://api.qrserver.com/v1/create-qr-code/?data=${ong.pix}&size=200x200`}
          alt="QR Code"
        />
      </div>
    </div>
  );
};

export default OngDetail;
