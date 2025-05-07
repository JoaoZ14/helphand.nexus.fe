import React from 'react';
import styled from 'styled-components';
import { useCampaigns } from '../context/CampaignsContext';
import CampaignCard from '../components/CampaignCard';

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
`;

const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
`;

const Title = styled.h1`
  color: #333;
`;

const CampaignsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 2rem;
`;

const LoadingMessage = styled.p`
  text-align: center;
  color: #666;
`;

const ErrorMessage = styled.p`
  text-align: center;
  color: red;
`;

const CampaignsList = () => {
  const { campaigns, loading, error } = useCampaigns();

  if (loading) {
    return <LoadingMessage>Carregando campanhas...</LoadingMessage>;
  }

  if (error) {
    return <ErrorMessage>Erro ao carregar campanhas: {error}</ErrorMessage>;
  }

  return (
    <Container>
      <Header>
        <Title>Campanhas Ativas</Title>
      </Header>
      <CampaignsGrid>
        {campaigns.map(campaign => (
          <CampaignCard key={campaign.id} campaign={campaign} />
        ))}
      </CampaignsGrid>
    </Container>
  );
};

export default CampaignsList; 