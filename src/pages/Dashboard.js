import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth, signOut } from '../firebase/config';
import styled from 'styled-components';

const DashboardContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  padding: 20px;
  background-color: #f5f5f5;
`;

const Card = styled.div`
  background: white;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 600px;
`;

const Button = styled.button`
  padding: 0.8rem 1.5rem;
  margin: 1rem 0;
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

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
      } else {
        navigate('/login');
      }
    });

    return () => unsubscribe();
  }, [navigate]);

  const handleLogout = async () => {
    try {
      await signOut();
      navigate('/login');
    } catch (error) {
      console.error('Erro ao fazer logout:', error);
    }
  };

  if (!user) {
    return null;
  }

  return (
    <DashboardContainer>
      <Card>
        <h2>Bem-vindo ao Dashboard</h2>
        <p>Email: {user.email}</p>
        <p>Nome: {user.displayName || 'Não informado'}</p>
        <Button onClick={handleLogout}>Sair</Button>
      </Card>
    </DashboardContainer>
  );
};

export default Dashboard; 