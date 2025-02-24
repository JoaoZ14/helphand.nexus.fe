import React from 'react';
import { useParams } from 'react-router-dom';
import { useOngs } from '../../context/OngsContext';
import './styles/detailsOng.css';

const OngDetail = () => {
  const { id } = useParams();
  const { ongs } = useOngs();
  const ong = ongs.find(o => o.id === parseInt(id));

  if (!ong) {
    return <div>ONG not found</div>;
  }

  return (
    <div className="ong-detail">
      <img src={ong.image} alt={ong.name} className="ong-detail-image" />
      <div className="ong-detail-info">
        <h2>{ong.name}</h2>
        <p>{ong.description}</p>
        <p>{ong.address}</p>
      </div>
    </div>
  );
};

export default OngDetail;
