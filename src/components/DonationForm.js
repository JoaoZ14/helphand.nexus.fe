import React, { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import styled from 'styled-components';

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY);

const FormContainer = styled.div`
  max-width: 500px;
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

const CardElementContainer = styled.div`
  padding: 0.8rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  background: white;
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
  &:disabled {
    background-color: #cccccc;
    cursor: not-allowed;
  }
`;

const ErrorMessage = styled.p`
  color: red;
  margin-top: 1rem;
`;

const SuccessMessage = styled.p`
  color: #4CAF50;
  margin-top: 1rem;
`;

const DonationFormComponent = ({ campaignId, onSuccess }) => {
  const [amount, setAmount] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    if (!stripe || !elements) {
      return;
    }

    try {
      const { error: stripeError, paymentMethod } = await stripe.createPaymentMethod({
        type: 'card',
        card: elements.getElement(CardElement),
      });

      if (stripeError) {
        setError(stripeError.message);
        setLoading(false);
        return;
      }

      // Aqui você faria a chamada para seu backend para processar o pagamento
      // const response = await fetch('/api/process-payment', {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      //   body: JSON.stringify({
      //     paymentMethodId: paymentMethod.id,
      //     amount: parseFloat(amount) * 100, // Convertendo para centavos
      //     campaignId,
      //   }),
      // });

      // const result = await response.json();

      // if (result.error) {
      //   setError(result.error);
      // } else {
      //   setSuccess('Doação realizada com sucesso!');
      //   onSuccess && onSuccess();
      // }

      // Simulando sucesso para demonstração
      setSuccess('Doação realizada com sucesso!');
      onSuccess && onSuccess();
    } catch (err) {
      setError('Erro ao processar pagamento. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <FormContainer>
      <h2>Fazer uma Doação</h2>
      {error && <ErrorMessage>{error}</ErrorMessage>}
      {success && <SuccessMessage>{success}</SuccessMessage>}
      <Form onSubmit={handleSubmit}>
        <Input
          type="number"
          placeholder="Valor da doação (R$)"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          required
          min="1"
          step="0.01"
        />
        <CardElementContainer>
          <CardElement
            options={{
              style: {
                base: {
                  fontSize: '16px',
                  color: '#424770',
                  '::placeholder': {
                    color: '#aab7c4',
                  },
                },
                invalid: {
                  color: '#9e2146',
                },
              },
            }}
          />
        </CardElementContainer>
        <Button type="submit" disabled={!stripe || loading}>
          {loading ? 'Processando...' : 'Doar Agora'}
        </Button>
      </Form>
    </FormContainer>
  );
};

const DonationForm = (props) => {
  return (
    <Elements stripe={stripePromise}>
      <DonationFormComponent {...props} />
    </Elements>
  );
};

export default DonationForm; 