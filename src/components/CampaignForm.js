import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCampaigns } from '../context/CampaignsContext';
import styled from 'styled-components';

const FormContainer = styled.div`
  max-width: 600px;
  margin: 2rem auto;
  padding: 2rem;
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const Input = styled.input`
  padding: 0.8rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
`;

const TextArea = styled.textarea`
  padding: 0.8rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
  min-height: 100px;
  resize: vertical;
`;

const Button = styled.button`
  padding: 0.8rem;
  background-color: #4CAF50;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  cursor: pointer;
  &:hover {
    background-color: #45a049;
  }
`;

const ErrorMessage = styled.p`
  color: red;
  margin-top: 1rem;
`;

const CampaignForm = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [goal, setGoal] = useState('');
  const [error, setError] = useState('');
  const { createCampaign } = useCampaigns();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const campaignData = {
        title,
        description,
        goal: parseFloat(goal),
        currentAmount: 0,
        status: 'active'
      };

      await createCampaign(campaignData);
      navigate('/dashboard');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <FormContainer>
      <h2>Criar Nova Campanha</h2>
      {error && <ErrorMessage>{error}</ErrorMessage>}
      <Form onSubmit={handleSubmit}>
        <Input
          type="text"
          placeholder="Título da Campanha"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <TextArea
          placeholder="Descrição da Campanha"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
        <Input
          type="number"
          placeholder="Meta de Arrecadação (R$)"
          value={goal}
          onChange={(e) => setGoal(e.target.value)}
          required
          min="0"
          step="0.01"
        />
        <Button type="submit">Criar Campanha</Button>
      </Form>
    </FormContainer>
  );
};

export default CampaignForm; 