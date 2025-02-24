import React from 'react';
import { Link } from 'react-router-dom';
import { useOngs } from '../../context/OngsContext';
import './styles/ongsList.css';

const OngsList = () => {
  const { ongs } = useOngs();

  return (
    <div className="ongs-list">
      {ongs.map(ong => (
        <Link to={`/ong-details/${ong.id}`} key={ong.id} className="ong-item">
          <img src={ong.image} alt={ong.name} className="ong-image" />
          <div className="ong-info">
            <h2>{ong.name}</h2>
            <p>{ong.description}</p>
            <p>{`${ong.address.street}, ${ong.address.city}, ${ong.address.state}`}</p>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default OngsList;
