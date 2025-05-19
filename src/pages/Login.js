import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { signIn, signInWithGoogle } from '../firebase/config';
import styled from 'styled-components';
import { FcGoogle } from 'react-icons/fc';

const LoginContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  padding: 20px;
  background-color: #fff;
  gap: 40px;
  @media (max-width: 800px) {
    flex-direction: column;
    gap: 20px;
    padding: 30px;
  }
`;

const LoginForm = styled.div`
  flex: 0 1 400px;
  padding: 40px;
  display: flex;
  flex-direction: column;
  align-items: center;
  background: #fff;
  border-radius: 16px;
  width: 100%;
  max-width: 400px;
  @media (max-width: 600px) {
    padding: 20px 8px;
    box-shadow: none;
    border-radius: 0;
    min-width: 0;
    max-width: 100vw;
  }
`;

const LogoSection = styled.div`
  flex: 0 1 400px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 40px;
  @media (max-width: 800px) {
    padding: 10px 0 0 0;
  }
`;

const Logo = styled.img`
  max-width: 300px;
  height: auto;
  @media (max-width: 600px) {
    display: none;
  }
`;

const Title = styled.h1`
  color: #FF6B6B;
  font-size: 24px;
  margin-bottom: 30px;
  text-align: center;
  width: 100%;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: 380px;
  @media (max-width: 600px) {
    max-width: 100vw;
    padding: 0;
  }
`;

const Input = styled.input`
  padding: 12px;
  margin: 8px 0;
  border: 1px solid #E0E0E0;
  box-shadow: inset 0 5px 5px #E0E0E0;
  border-radius: 24px;
  font-size: 14px;
  width: 100%;
  min-width: 0;
  @media (max-width: 600px) {
    font-size: 15px;
    padding: 10px;
    min-width: 0;
  }
`;

const Button = styled.button`
  padding: 8px;
  margin: 16px 0;
  background-color: #92A8D1;
  color: white;
  border: none;
  border-radius: 24px;
  font-size: 14px;
  width: 150px;
  align-self: center;
  cursor: pointer;
  &:hover {
    background-color: #7B93BC;
  }
  &:disabled {
    background-color: #cccccc;
    cursor: not-allowed;
  }
  @media (max-width: 600px) {
    width: 100%;
    font-size: 15px;
  }
`;

const ErrorMessage = styled.p`
  color: #FF6B6B;
  margin-top: 8px;
  font-size: 14px;
`;

const CadastrarLink = styled(Link)`
  color: #92A8D1;
  text-decoration: none;
  font-size: 14px;
  &:hover {
    text-decoration: underline;
  }
`;

const GoogleButton = styled.button`
  padding: 8px;
  margin: 16px 0;
  background-color: #fff;
  color: #757575;
  border: 1px solid #E0E0E0;
  border-radius: 24px;
  font-size: 14px;
  width: 150px;
  align-self: center;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  &:hover {
    background-color: #f5f5f5;
  }
  @media (max-width: 600px) {
    width: 100%;
    font-size: 15px;
  }
`;

const Divider = styled.div`
  display: flex;
  align-items: center;
  margin: 16px 0;
  width: 100%;
  
  &::before,
  &::after {
    content: '';
    flex: 1;
    border-bottom: 1px solid #E0E0E0;
  }
  
  span {
    padding: 0 10px;
    color: #9E9E9E;
    font-size: 14px;
  }
`;

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const { user, userData } = await signIn(formData.email, formData.password);
      
      // Verifica se o usuário está ativo
      if (!userData?.status || userData.status !== 'ativo') {
        throw new Error('Conta desativada. Entre em contato com o suporte.');
      }

      // Redireciona para o perfil
      navigate('/profile');
    } catch (error) {
      console.error('Erro ao fazer login:', error);
      setError(
        error.message === 'Conta desativada. Entre em contato com o suporte.'
          ? error.message
          : 'Email ou senha inválidos'
      );
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setError('');
    setLoading(true);

    try {
      const { user, userData } = await signInWithGoogle();
      
      // Verifica se o usuário está ativo
      if (!userData?.status || userData.status !== 'ativo') {
        throw new Error('Conta desativada. Entre em contato com o suporte.');
      }

      // Redireciona para o perfil
      navigate('/profile');
    } catch (error) {
      console.error('Erro ao fazer login com Google:', error);
      setError('Erro ao fazer login com Google. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <LoginContainer>
      <LoginForm>
        <Title>LOGIN</Title>
        <GoogleButton type="button" onClick={handleGoogleSignIn} disabled={loading}>
          <FcGoogle size={20} />
          Google
        </GoogleButton>
        <Divider>
          <span>ou</span>
        </Divider>
        <Form onSubmit={handleSubmit}>
          <Input
            type="email"
            name="email"
            placeholder="Digite seu email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <Input
            type="password"
            name="password"
            placeholder="Digite sua senha"
            value={formData.password}
            onChange={handleChange}
            required
          />
          {error && <ErrorMessage>{error}</ErrorMessage>}
          <Button type="submit" disabled={loading}>
            {loading ? 'Entrando...' : 'ENTRAR'}
          </Button>
          <div style={{ textAlign: 'center', marginTop: '16px' }}>
            <span style={{ fontSize: '14px' }}>Ainda não tem uma conta? </span>
            <CadastrarLink to="/register">Cadastre-se</CadastrarLink>
          </div>
        </Form>
      </LoginForm>
      <LogoSection>
        <Logo src="/logo.png" alt="Logo" />
      </LogoSection>
    </LoginContainer>
  );
};

export default Login;