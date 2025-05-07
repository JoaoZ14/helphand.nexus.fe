import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth, db } from '../firebase/config';
import { doc, getDoc } from 'firebase/firestore';
import styled from 'styled-components';

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
`;

const ProfileCard = styled.div`
  background: white;
  border-radius: 8px;
  padding: 2rem;
  margin-top: 2rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const ProfileHeader = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 2rem;
`;

const Avatar = styled.img`
  width: 150px;
  height: 150px;
  border-radius: 50%;
  margin-right: 2rem;
  object-fit: cover;
`;

const ProfileInfo = styled.div`
  flex: 1;
`;

const Title = styled.h1`
  font-size: 2rem;
  margin-bottom: 1rem;
  color: #333;
`;

const InfoText = styled.p`
  font-size: 1rem;
  color: #666;
  margin-bottom: 0.5rem;
`;

const LoadingText = styled.p`
  text-align: center;
  font-size: 1.2rem;
  color: #666;
`;

const UserProfile = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const user = auth.currentUser;
        if (!user) {
          navigate('/login');
          return;
        }

        const userDoc = await getDoc(doc(db, 'users', user.uid));
        if (userDoc.exists()) {
          setUserData(userDoc.data());
        }
      } catch (error) {
        console.error('Erro ao carregar dados do usuário:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [navigate]);

  if (loading) {
    return (
      <Container>
        <LoadingText>Carregando...</LoadingText>
      </Container>
    );
  }

  return (
    <Container>
      <ProfileCard>
        <ProfileHeader>
          <Avatar
            src={userData?.photoURL || 'https://via.placeholder.com/150'}
            alt={userData?.displayName || 'Usuário'}
          />
          <ProfileInfo>
            <Title>{userData?.displayName || 'Usuário'}</Title>
            <InfoText>Email: {userData?.email}</InfoText>
            <InfoText>Tipo: {userData?.tipo === 'doador' ? 'Doador' : 'Beneficiário'}</InfoText>
            <InfoText>
              Membro desde: {new Date(userData?.createdAt?.toDate()).toLocaleDateString()}
            </InfoText>
          </ProfileInfo>
        </ProfileHeader>
      </ProfileCard>

      <ProfileCard>
        <Title>Histórico de Doações</Title>
        <InfoText>Em breve você poderá ver seu histórico de doações aqui.</InfoText>
      </ProfileCard>
    </Container>
  );
};

export default UserProfile; 