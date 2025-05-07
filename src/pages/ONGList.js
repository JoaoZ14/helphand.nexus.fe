import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { useOngs } from '../context/OngsContext';

const Container = styled.div`
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
  margin-top: 20px;
`;

const ONGCard = styled(Link)`
  background: white;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
  transition: all 0.2s ease;
  text-decoration: none;
  color: inherit;
  position: relative;
  overflow: hidden;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.08);
  }
`;

const VerifiedBadge = styled.div`
  position: absolute;
  top: 10px;
  right: 10px;
  background-color: #4CAF50;
  color: white;
  padding: 4px 8px;
  border-radius: 12px;
  font-size: 0.8rem;
  display: flex;
  align-items: center;
  gap: 4px;
`;

const ONGImage = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
  border-radius: 4px;
  margin-bottom: 15px;
`;

const ONGName = styled.h2`
  font-size: 1.5rem;
  color: #333;
  margin-bottom: 10px;
`;

const ONGDescription = styled.p`
  color: #666;
  margin-bottom: 15px;
  line-height: 1.4;
`;

const ONGInfo = styled.div`
  font-size: 0.9rem;
  color: #666;
  margin-bottom: 15px;
`;

const ONGContact = styled.div`
  font-size: 0.9rem;
  color: #888;
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

const Category = styled.span`
  background-color: #92A8D1;
  color: white;
  padding: 4px 8px;
  border-radius: 12px;
  font-size: 0.8rem;
  display: inline-block;
  margin-bottom: 10px;
`;

const WebsiteLink = styled.a`
  color: #92A8D1;
  text-decoration: none;
  &:hover {
    text-decoration: underline;
  }
`;

const LoadingMessage = styled.div`
  text-align: center;
  padding: 40px;
  font-size: 1.2rem;
  color: #666;
`;

const ErrorMessage = styled.div`
  text-align: center;
  padding: 40px;
  color: #FF6B6B;
  font-size: 1.2rem;
`;

const formatDate = (dateString) => {
  if (!dateString) return 'Data não disponível';
  
  try {
    // Se a data vier como timestamp do Firestore
    if (dateString.seconds) {
      const date = new Date(dateString.seconds * 1000);
      return new Intl.DateTimeFormat('pt-BR').format(date);
    }
    
    // Se a data vier como string ISO ou outro formato
    const date = new Date(dateString);
    if (isNaN(date.getTime())) {
      // Se a data for inválida, tenta converter do formato DD/MM/YYYY
      const [day, month, year] = dateString.split(/[/-]/);
      const parsedDate = new Date(year, month - 1, day);
      if (!isNaN(parsedDate.getTime())) {
        return new Intl.DateTimeFormat('pt-BR').format(parsedDate);
      }
      return 'Data inválida';
    }
    return new Intl.DateTimeFormat('pt-BR').format(date);
  } catch (error) {
    console.error('Erro ao formatar data:', error);
    return 'Data inválida';
  }
};

const ONGList = () => {
  const { ongs, loading, error } = useOngs();

  if (loading) {
    return <LoadingMessage>Carregando ONGs...</LoadingMessage>;
  }

  if (error) {
    return <ErrorMessage>{error}</ErrorMessage>;
  }

  return (
    <Container>
      <h1>ONGs Disponíveis</h1>
      <Grid>
        {ongs.map((ong) => (
          <ONGCard key={ong.id} to={`/ong-details/${ong.id}`}>
            {ong.verificada && (
              <VerifiedBadge>
                <span role="img" aria-label="verificada">✓</span>
                Verificada
              </VerifiedBadge>
            )}
            {ong.imagemUrl && (
              <ONGImage src={ong.imagemUrl} alt={ong.nome} />
            )}
            <Category>{ong.categoria}</Category>
            <ONGName>{ong.nome}</ONGName>
            <ONGDescription>{ong.descricao}</ONGDescription>
            <ONGInfo>
              Desde: {formatDate(ong.dataCriacao)}
            </ONGInfo>
            <ONGContact>
              <div>Email: {ong.email}</div>
              {ong.telefone && <div>Telefone: {ong.telefone}</div>}
              {ong.endereco && <div>Endereço: {ong.endereco}</div>}
              {ong.site && (
                <div>
                  Website: <WebsiteLink href={ong.site} target="_blank" rel="noopener noreferrer">
                    {ong.site}
                  </WebsiteLink>
                </div>
              )}
            </ONGContact>
          </ONGCard>
        ))}
      </Grid>
    </Container>
  );
};

export default ONGList; 