import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { createUser, signInWithGoogle } from '../firebase/config';
import styled from 'styled-components';
import { FcGoogle } from 'react-icons/fc';

const RegisterContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  padding: 20px;
  background-color: #fff;
  gap: 40px;
`;

const RegisterForm = styled.div`
  flex: 0 1 400px;
  padding: 40px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const LogoSection = styled.div`
  flex: 0 1 400px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 40px;
`;

const Logo = styled.img`
  max-width: 300px;
  height: auto;
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
`;

const Input = styled.input`
  padding: 12px;
  margin: 8px 0;
  border: 1px solid #E0E0E0;
  box-shadow: inset 0 5px 5px #E0E0E0;
  border-radius: 24px;
  font-size: 14px;
  width: 100%;
  min-width: 280px;
  &::placeholder {
    color: #9E9E9E;
  }
  &:focus {
    outline: none;
    border-color: #92A8D1;
    box-shadow: inset 0 5px 5px rgba(146, 168, 209, 0.2);
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
  transition: background-color 0.2s;
  &:hover {
    background-color: #7B93BC;
  }
  &:disabled {
    background-color: #cccccc;
    cursor: not-allowed;
  }
`;

const ErrorMessage = styled.p`
  color: #FF6B6B;
  margin-top: 8px;
  font-size: 14px;
  text-align: center;
  width: 100%;
`;

const LoginLink = styled(Link)`
  color: #92A8D1;
  text-decoration: none;
  font-size: 14px;
  &:hover {
    text-decoration: underline;
  }
`;

const FieldError = styled.span`
  color: #FF6B6B;
  font-size: 12px;
  margin-top: 4px;
  align-self: flex-start;
  margin-left: 12px;
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

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    telefone: '',
    cidade: '',
    estado: ''
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [generalError, setGeneralError] = useState('');
  const navigate = useNavigate();

  const validateForm = () => {
    const newErrors = {};

    // Validação do nome
    if (!formData.name.trim()) {
      newErrors.name = 'Nome é obrigatório';
    } else if (formData.name.trim().length < 3) {
      newErrors.name = 'Nome deve ter pelo menos 3 caracteres';
    }

    // Validação do email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email) {
      newErrors.email = 'Email é obrigatório';
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Email inválido';
    }

    // Validação da senha
    if (!formData.password) {
      newErrors.password = 'Senha é obrigatória';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Senha deve ter pelo menos 6 caracteres';
    }

    // Validação da confirmação de senha
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'As senhas não coincidem';
    }

    // Validação do telefone (opcional)
    if (formData.telefone && !/^\(\d{2}\) \d{5}-\d{4}$/.test(formData.telefone)) {
      newErrors.telefone = 'Formato: (99) 99999-9999';
    }

    // Validação da cidade
    if (!formData.cidade.trim()) {
      newErrors.cidade = 'Cidade é obrigatória';
    }

    // Validação do estado
    if (!formData.estado.trim()) {
      newErrors.estado = 'Estado é obrigatório';
    } else if (formData.estado.length !== 2) {
      newErrors.estado = 'Use a sigla do estado (ex: SP)';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const formatPhone = (value) => {
    // Remove tudo que não é número
    const numbers = value.replace(/\D/g, '');
    
    // Aplica a máscara
    if (numbers.length <= 11) {
      return numbers.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
    }
    return value;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    if (name === 'telefone') {
      setFormData(prev => ({
        ...prev,
        [name]: formatPhone(value)
      }));
    } else if (name === 'estado') {
      setFormData(prev => ({
        ...prev,
        [name]: value.toUpperCase()
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }

    // Limpa o erro do campo quando o usuário começa a digitar
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setGeneralError('');

    if (!validateForm()) {
      return;
    }

    setLoading(true);

    try {
      const userData = {
        name: formData.name.trim(),
        email: formData.email.trim(),
        password: formData.password,
        telefone: formData.telefone,
        cidade: formData.cidade.trim(),
        estado: formData.estado.trim().toUpperCase()
      };

      await createUser(userData.email, userData.password, userData);
      navigate('/dashboard');
    } catch (error) {
      console.error('Erro ao registrar:', error);
      if (error.code === 'auth/email-already-in-use') {
        setGeneralError('Este email já está em uso. Por favor, use outro email ou faça login.');
      } else {
        setGeneralError('Erro ao criar conta. Por favor, tente novamente.');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignUp = async () => {
    setGeneralError('');
    setLoading(true);

    try {
      const { user, userData } = await signInWithGoogle();
      navigate('/dashboard');
    } catch (error) {
      console.error('Erro ao criar conta com Google:', error);
      setGeneralError('Erro ao criar conta com Google. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <RegisterContainer>
      <RegisterForm>
        <Title>CRIAR CONTA</Title>
        <GoogleButton type="button" onClick={handleGoogleSignUp} disabled={loading}>
          <FcGoogle size={20} />
          Google
        </GoogleButton>
        <Divider>
          <span>ou</span>
        </Divider>
        <Form onSubmit={handleSubmit}>
          <Input
            type="text"
            name="name"
            placeholder="Digite seu nome completo"
            value={formData.name}
            onChange={handleChange}
            required
          />
          {errors.name && <FieldError>{errors.name}</FieldError>}

          <Input
            type="email"
            name="email"
            placeholder="Digite seu email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          {errors.email && <FieldError>{errors.email}</FieldError>}

          <Input
            type="password"
            name="password"
            placeholder="Digite sua senha"
            value={formData.password}
            onChange={handleChange}
            required
          />
          {errors.password && <FieldError>{errors.password}</FieldError>}

          <Input
            type="password"
            name="confirmPassword"
            placeholder="Confirme sua senha"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
          />
          {errors.confirmPassword && <FieldError>{errors.confirmPassword}</FieldError>}

          <Input
            type="tel"
            name="telefone"
            placeholder="Digite seu telefone: (99) 99999-9999"
            value={formData.telefone}
            onChange={handleChange}
            maxLength={15}
          />
          {errors.telefone && <FieldError>{errors.telefone}</FieldError>}

          <Input
            type="text"
            name="cidade"
            placeholder="Digite sua cidade"
            value={formData.cidade}
            onChange={handleChange}
            required
          />
          {errors.cidade && <FieldError>{errors.cidade}</FieldError>}

          <Input
            type="text"
            name="estado"
            placeholder="Digite a sigla do seu estado (ex: SP)"
            value={formData.estado}
            onChange={handleChange}
            maxLength={2}
            required
          />
          {errors.estado && <FieldError>{errors.estado}</FieldError>}

          {generalError && <ErrorMessage>{generalError}</ErrorMessage>}
          
          <Button type="submit" disabled={loading}>
            {loading ? 'Criando conta...' : 'CRIAR CONTA'}
          </Button>
          
          <div style={{ textAlign: 'center' }}>
            <span style={{ fontSize: '14px' }}>Já tem uma conta? </span>
            <LoginLink to="/login">Faça login</LoginLink>
          </div>
        </Form>
      </RegisterForm>
      <LogoSection>
        <Logo src="/logo.png" alt="Logo" />
      </LogoSection>
    </RegisterContainer>
  );
};

export default Register; 