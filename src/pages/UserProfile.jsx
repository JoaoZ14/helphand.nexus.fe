import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth, db } from '../firebase/config';
import { doc, getDoc } from 'firebase/firestore';
import { AuthContext } from '../context/AuthContext';
import { useOngs } from '../context/OngsContext';
import styled from 'styled-components';
import { FaUserCircle, FaHeart, FaCog, FaLock, FaCreditCard, FaUserEdit } from 'react-icons/fa';

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  display: grid;
  gap: 2rem;
  grid-template-columns: 1fr 3fr;
`;

const Sidebar = styled.div`
  background: white;
  padding: 1.5rem;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const MainContent = styled.div`
  display: grid;
  gap: 2rem;
`;

const ProfileCard = styled.div`
  background: white;
  border-radius: 8px;
  padding: 2rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const SectionTitle = styled.h2`
  color: #333;
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const FavoriteOrgCard = styled.div`
  padding: 1rem;
  background: white;
  border-radius: 8px;
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1rem;
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

const ProfileInfo = styled.div`
  flex: 1;
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

const DefaultAvatar = styled(FaUserCircle)`
  width: 150px;
  height: 150px;
  color: #ccc;
  margin-right: 2rem;
`;

const SettingsMenu = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const StyledSettingsButton = styled.button`
  padding: 1rem;
  border: none;
  border-radius: 6px;
  background: ${props => props.isActive ? '#f0f2f5' : 'transparent'};
  color: #333;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 1rem;
  transition: all 0.2s ease;
  width: 100%;
  text-align: left;
  font-size: 0.95rem;

  &:hover {
    background: #f0f2f5;
    transform: translateX(5px);
  }

  &:active {
    background: #e8e8e8;
  }

  svg {
    color: #666;
    font-size: 1.1rem;
    min-width: 20px;
  }
`;

const UserProfile = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const { user } = useContext(AuthContext);
  const { ongs } = useOngs();
  const [favoriteOngs, setFavoriteOngs] = useState([]);

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

    const fetchFavorites = async () => {
      if (user) {
        const userDoc = await getDoc(doc(db, 'users', user.uid));
        if (userDoc.exists()) {
          setFavoriteOngs(userDoc.data().favoriteOngs || []);
        }
      }
    };

    fetchUserData();
    fetchFavorites();
  }, [navigate, user]);

  const favoriteOngsData = ongs.filter(ong => favoriteOngs.includes(ong.id));

  if (loading) {
    return (
      <Container>
        <LoadingText>Carregando...</LoadingText>
      </Container>
    );
  }

  return (
    <Container>
     <Sidebar>
  <div>
    <SectionTitle>
      <FaCog /> Configurações
    </SectionTitle>
    <SettingsMenu>
      <StyledSettingsButton onClick={() => navigate('/edit-profile')}>
        <FaUserEdit />
        Editar Perfil
      </StyledSettingsButton>

      <StyledSettingsButton onClick={() => navigate('/payment-methods')}>
        <FaCreditCard />
        Métodos de Pagamento
      </StyledSettingsButton>

      <StyledSettingsButton onClick={() => navigate('/privacy')}>
        <FaLock />
        Privacidade
      </StyledSettingsButton>
    </SettingsMenu>
  </div>
</Sidebar>

      <MainContent>
        <ProfileCard>
          <ProfileHeader>
            {userData?.photoURL ? (
              <Avatar
                src={userData.photoURL}
                alt={userData.displayName || 'Usuário'}
              />
            ) : (
              <DefaultAvatar />
            )}
            <ProfileInfo>
              <Title>{userData?.displayName || 'Usuário'}</Title>
              <InfoText>Email: {userData?.email}</InfoText>
              <InfoText>Tipo: {userData?.tipo === 'doador' ? 'Doador' : 'Beneficiário'}</InfoText>
            </ProfileInfo>
          </ProfileHeader>
        </ProfileCard>

        <div>
          <SectionTitle><FaHeart /> ONGs Favoritas</SectionTitle>
          {favoriteOngsData.length === 0 ? (
            <InfoText>Nenhuma ONG favoritada ainda.</InfoText>
          ) : (
            favoriteOngsData.map((org) => (
              <FavoriteOrgCard key={org.id}>
                <FaHeart style={{ color: '#e91e63' }} />
                <div>
                  <div style={{ fontWeight: 'bold' }}>{org.nome}</div>
                  <div style={{ color: '#666' }}>{org.endereco?.cidade} - {org.endereco?.estado}</div>
                </div>
              </FavoriteOrgCard>
            ))
          )}
        </div>
      </MainContent>
    </Container>
  );
};

export default UserProfile;