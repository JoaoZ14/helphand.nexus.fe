import React from "react";
import { useOngs } from "../../context/OngsContext";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { FiMapPin, FiImage, FiCheckCircle } from "react-icons/fi";
import { db } from "../../firebase/config";
import { doc, updateDoc, increment } from "firebase/firestore";

const ListContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
`;

const Title = styled.h1`
  color: #ff6b6b;
  text-align: center;
  margin-bottom: 2rem;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(270px, 1fr));
  gap: 2rem;

  @media (max-width: 700px) {
    grid-template-columns: 1fr;
    gap: 1.2rem;
  }
`;

const Card = styled(Link)`
  background: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 1px 5px rgba(0, 0, 0, 0.1);
  transition: transform 0.18s, box-shadow 0.18s;
  text-decoration: none;
  color: inherit;
  width: 100%;
  min-width: 0;
  max-width: 370px;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  position: relative;

  &:hover {
    transform: scale(1.025) translateY(-2px);
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.13);
  }
`;

const VerifiedBadge = styled.div`
  position: absolute;
  top: 12px;
  left: 12px;
  background: #4caf50;
  color: #fff;
  padding: 4px 10px;
  border-radius: 16px;
  font-size: 0.85rem;
  display: flex;
  align-items: center;
  gap: 5px;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.08);
  z-index: 2;
`;

const ClickBadge = styled.div`
  position: absolute;
  top: 12px;
  right: 12px;
  background: #1976d2;
  color: #fff;
  padding: 4px 10px;
  border-radius: 16px;
  font-size: 0.85rem;
  display: flex;
  align-items: center;
  gap: 5px;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.08);
  z-index: 2;
`;

const CardImageBox = styled.div`
  width: 100%;
  height: 200px;
  background: #f1f5f9;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const CardImage = styled.img`
  height: 200px;
  border-radius: 0;
`;

const CardPlaceholder = styled.div`
  width: 100%;
  height: 200px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #bdbdbd;
  font-size: 2.5rem;
  background: #f1f5f9;
`;

const CardContent = styled.div`
  padding: 1.5rem;
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const CardTitle = styled.h2`
  color: #333;
  margin-bottom: 0.7rem;
  font-size: 1.15rem;
  font-weight: 600;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
`;

const CardDescription = styled.p`
  color: #666;
  font-size: 0.95rem;
  line-height: 1.5;
  margin-bottom: 0.7rem;
  max-height: 2.8em;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const CardLocation = styled.div`
  color: #92a8d1;
  font-size: 0.97rem;
  display: flex;
  align-items: center;
  gap: 6px;
  margin-top: 0.2rem;
`;

const OngsList = () => {
  const { ongs, loading, error } = useOngs();

  // Encontra a ONG mais acessada
  const maxClicks = Math.max(...ongs.map((ong) => ong.cliques || 0), 0);
  const mostAccessedOngId = ongs.find((ong) => (ong.cliques || 0) === maxClicks)?.id;

  // Função para registrar clique
  const handleCardClick = async (e, ongId) => {
    try {
      await updateDoc(doc(db, "ongs", ongId), { cliques: increment(1) });
    } catch (err) {
      // Erro silenciado propositalmente
    }
  };

  if (loading) return <div>Carregando...</div>;
  if (error) return <div>Erro ao carregar ONGs</div>;

  return (
    <ListContainer>
      <Title>ONGs Cadastradas</Title>
      <Grid>
        {ongs.map((ong) => {
          const isMostAccessed = ong.id === mostAccessedOngId && maxClicks > 0;
          return (
            <Card
              key={ong.id}
              to={`/ong-details/${ong.id}`}
              onClick={(e) => handleCardClick(e, ong.id)}
            >
              {ong.verificada && (
                <VerifiedBadge>
                  <FiCheckCircle size={16} style={{ marginRight: 3 }} /> Verificada
                </VerifiedBadge>
              )}
              {/* Badge de mais acessada acima do nome */}
              <CardImageBox>
                {ong.imagemUrl ? (
                  <CardImage src={ong.imagemUrl} alt={ong.nome} />
                ) : (
                  <CardPlaceholder>
                    <FiImage />
                  </CardPlaceholder>
                )}
              </CardImageBox>
              <CardContent>
                {isMostAccessed && (
                  <div style={{ marginBottom: 6 }}>
                    <ClickBadge style={{ position: 'static', margin: 0, background: '#ff9800', boxShadow: 'none' }}>
                      <b>🔥 Mais acessada</b>
                    </ClickBadge>
                  </div>
                )}
                <CardTitle>{ong?.nome}</CardTitle>
                <CardDescription
                  title={
                    ong?.endereco?.cidade && ong?.endereco?.estado
                      ? `${ong?.endereco?.cidade} - ${ong?.endereco?.estado}`
                      : ""
                  }
                >
                  {ong?.descricao?.length > 60
                    ? ong?.descricao.slice(0, 60) + "..."
                    : ong?.descricao}
                </CardDescription>
                <CardLocation>
                  <FiMapPin />
                  {ong?.endereco?.cidade} - {ong?.endereco?.estado}
                </CardLocation>
              </CardContent>
              <ClickBadge style={isMostAccessed ? { background: '#ff9800' } : {}}>
                {ong.cliques ? `${ong.cliques} cliques` : '0 cliques'}
              </ClickBadge>
            </Card>
          );
        })}
      </Grid>
    </ListContainer>
  );
};

export default OngsList;
