import React from "react";
import { useOngs } from "../../context/OngsContext";
import { Link } from "react-router-dom";
import styled from "styled-components";

const ListContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
`;

const Title = styled.h1`
  color: #FF6B6B;
  text-align: center;
  margin-bottom: 2rem;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 2rem;
`;

const Card = styled(Link)`
  background: white;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
  transition: all 0.2s ease;
  text-decoration: none;
  color: inherit;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.08);
  }
`;

const CardImage = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
`;

const CardContent = styled.div`
  padding: 1.5rem;
`;

const CardTitle = styled.h2`
  color: #333;
  margin-bottom: 1rem;
  font-size: 1.2rem;
`;

const CardDescription = styled.p`
  color: #666;
  font-size: 0.9rem;
  line-height: 1.6;
  margin-bottom: 1rem;
`;

const CardInfo = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 1rem;
`;

const InfoItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #666;
  font-size: 0.9rem;
`;

const OngsList = () => {
  const { ongs, loading, error } = useOngs();

  if (loading) return <div>Carregando...</div>;
  if (error) return <div>Erro ao carregar ONGs</div>;

  return (
    <ListContainer>
      <Title>ONGs Cadastradas</Title>
      <Grid>
        {ongs.map((ong) => (
          <Card key={ong.id} to={`/ong-details/${ong.id}`}>
            <CardImage src={ong.image} alt={ong.name} />
            <CardContent>
              <CardTitle>{ong.name}</CardTitle>
              <CardDescription>{ong.description}</CardDescription>
              <CardInfo>
                <InfoItem>
                  <span>📍</span>
                  {ong.address.city} - {ong.address.state}
                </InfoItem>
                <InfoItem>
                  <span>🎯</span>
                  {ong.donationNeeds.length} necessidades
                </InfoItem>
              </CardInfo>
            </CardContent>
          </Card>
        ))}
      </Grid>
    </ListContainer>
  );
};

export default OngsList;
