import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth, db, updateUser } from '../firebase/config';
import { doc, getDoc } from 'firebase/firestore';
import { AuthContext } from '../context/AuthContext';
import styled from 'styled-components';
import { FaUserCircle, FaCog } from 'react-icons/fa';

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

const UserProfile = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const { user } = useContext(AuthContext);
  const [editMode, setEditMode] = useState(false);
  const [form, setForm] = useState({ displayName: '', email: '' });
  const [saving, setSaving] = useState(false);

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
  }, [navigate, user]);

  useEffect(() => {
    if (userData) {
      setForm({
        displayName: userData.displayName || '',
        email: userData.email || '',
      });
    }
  }, [userData]);

  const handleCancel = () => {
    setEditMode(false);
    setForm({
      displayName: userData.displayName || '',
      email: userData.email || '',
    });
  };
  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  const getUidFromLocalStorage = () => {
    try {
      const apiKey = process.env.REACT_APP_FIREBASE_API_KEY || 'AIzaSyAPrGwSX0z5AGBlYiV-Bd_3v5YuPSQp548';
      const authData = localStorage.getItem(`firebase:authUser:${apiKey}:[DEFAULT]`);
      if (authData) {
        const parsed = JSON.parse(authData);
        return parsed.uid;
      }
    } catch (e) { console.error('Erro ao ler uid do localStorage:', e); }
    return null;
  };

  const handleSave = async () => {
    const uid = getUidFromLocalStorage();
    if (!uid) {
      alert('Usuário não autenticado. Faça login novamente.');
      setSaving(false);
      return;
    }
    setSaving(true);
    try {
      await updateUser(uid, {
        displayName: form.displayName,
        email: form.email,
      });
      setUserData({ ...userData, displayName: form.displayName, email: form.email });
      setEditMode(false);
    } catch (err) {
      console.error('Erro ao salvar dados:', err);
    }
    setSaving(false);
  };

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
            <FaCog /> Meu Perfil
          </SectionTitle>
          <SettingsMenu>
            <div style={{marginTop: 32, color: '#888', fontSize: '0.98rem', lineHeight: 1.6}}>
              <div style={{marginBottom: 12}}>
                <b>Bem-vindo ao seu painel!</b>
              </div>
              <div style={{marginBottom: 8}}>
                Aqui você pode visualizar e atualizar suas informações pessoais.
              </div>
              <div style={{marginBottom: 8}}>
                <span style={{color:'#3182ce'}}>Em breve:</span> mais opções de personalização, histórico de doações e preferências de contato.
              </div>
              
            </div>
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
              {editMode ? (
                <>
                  <Title>
                    <input
                      name="displayName"
                      value={form.displayName}
                      onChange={handleChange}
                      style={{fontSize:'1.5rem',padding:'4px 8px',borderRadius:4,border:'1px solid #ccc',marginBottom:8,width:'100%'}}
                    />
                  </Title>
                  <InfoText>
                    Email: <input
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                      style={{fontSize:'1rem',padding:'4px 8px',borderRadius:4,border:'1px solid #ccc',width:'70%'}}
                    />
                  </InfoText>
                  <div style={{display:'flex',gap:8,marginTop:8}}>
                    <button onClick={handleSave} disabled={saving} style={{background:'#3182ce',color:'#fff',border:'none',borderRadius:4,padding:'6px 18px',fontWeight:600,cursor:'pointer'}}>
                      {saving ? 'Salvando...' : 'Salvar'}
                    </button>
                    <button onClick={handleCancel} disabled={saving} style={{background:'#eee',color:'#333',border:'none',borderRadius:4,padding:'6px 18px',fontWeight:600,cursor:'pointer'}}>
                      Cancelar
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <Title>{userData?.displayName || 'Usuário'}</Title>
                  <InfoText>Email: {userData?.email}</InfoText>
                  <InfoText>Tipo: {userData?.tipo === 'doador' ? 'Doador' : 'Beneficiário'}</InfoText>
                </>
              )}
            </ProfileInfo>
          </ProfileHeader>
        </ProfileCard>
      </MainContent>
    </Container>
  );
};

export default UserProfile;