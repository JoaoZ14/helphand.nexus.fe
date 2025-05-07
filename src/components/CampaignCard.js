import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const Card = styled.div`
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  padding: 1.5rem;
  margin-bottom: 1rem;
  cursor: pointer;
  transition: transform 0.2s;

  &:hover {
    transform: translateY(-2px);
  }
`;

const Title = styled.h3`
  margin: 0 0 1rem 0;
  color: #333;
`;

const Description = styled.p`
  color: #666;
  margin-bottom: 1rem;
`;

const ProgressBar = styled.div`
  height: 8px;
  background-color: #f0f0f0;
  border-radius: 4px;
  margin-bottom: 1rem;
  overflow: hidden;
`;

const Progress = styled.div`
  height: 100%;
  background-color: #4CAF50;
  width: ${props => props.percentage}%;
  transition: width 0.3s ease;
`;

const Info = styled.div`
  display: flex;
  justify-content: space-between;
  color: #666;
  font-size: 0.9rem;
`;

const CampaignCard = ({ campaign }) => {
  const navigate = useNavigate();
  const percentage = Math.min((campaign.currentAmount / campaign.goal) * 100, 100);

  const handleClick = () => {
    navigate(`/campaign/${campaign.id}`);
  };

  return (
    <Card onClick={handleClick}>
      <Title>{campaign.title}</Title>
      <Description>{campaign.description}</Description>
      <ProgressBar>
        <Progress percentage={percentage} />
      </ProgressBar>
      <Info>
        <span>Arrecadado: R$ {campaign.currentAmount.toFixed(2)}</span>
        <span>Meta: R$ {campaign.goal.toFixed(2)}</span>
      </Info>
    </Card>
  );
};

export default CampaignCard; 