import React, { useState } from 'react';
import styled from 'styled-components';

const FAQContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
`;

const Title = styled.h1`
  color: #FF6B6B;
  text-align: center;
  margin-bottom: 2rem;
`;

const CategoryTitle = styled.h2`
  color: #333;
  margin: 2rem 0 1rem;
  padding-bottom: 0.5rem;
  border-bottom: 2px solid #FF6B6B;
`;

const FAQItem = styled.div`
  margin-bottom: 1rem;
  background: white;
  border-radius: 8px;
  padding: 1.5rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
  transition: all 0.2s ease;
  
  &:hover {
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.08);
  }
`;

const Question = styled.h3`
  color: #333;
  margin-bottom: 1rem;
  font-size: 1.2rem;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
  transition: color 0.2s ease;
  
  &:hover {
    color: #FF6B6B;
  }
`;

const Answer = styled.p`
  color: #666;
  line-height: 1.6;
  margin-top: 1rem;
  animation: fadeIn 0.2s ease;
`;

const FAQ = () => {
  const [expandedItems, setExpandedItems] = useState({});

  const toggleItem = (index) => {
    setExpandedItems(prev => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

  const faqData = {
    "Sobre o HelpHand": [
      {
        question: "O que é o HelpHand?",
        answer: "O HelpHand é uma plataforma inovadora que conecta doadores a ONGs e instituições que precisam de ajuda. Nosso objetivo é facilitar o processo de doação e tornar a ajuda mais acessível a todos. Através do nosso sistema, você pode doar dinheiro, alimentos, roupas, brinquedos e remédios para causas que precisam de apoio, tudo de forma segura e transparente."
      },
      {
        question: "Como o HelpHand garante a segurança das doações?",
        answer: "Implementamos várias medidas de segurança: verificação rigorosa das ONGs cadastradas, sistema de pagamento seguro para doações em dinheiro, rastreamento de doações físicas e feedback dos doadores. Além disso, todas as transações são registradas e podem ser auditadas."
      },
      {
        question: "O HelpHand cobra alguma taxa?",
        answer: "O HelpHand é uma plataforma sem fins lucrativos. Não cobramos taxas sobre as doações. No caso de doações em dinheiro, pode haver uma pequena taxa cobrada pela operadora de pagamento, que é claramente informada antes da confirmação da doação."
      }
    ],
    "Cadastro e Conta": [
      {
        question: "Como posso me cadastrar na plataforma?",
        answer: "Você pode se cadastrar de duas formas: criando uma conta com email e senha ou usando sua conta do Google. O processo é simples e rápido. Basta clicar em 'Cadastre-se' na página inicial, preencher seus dados básicos e confirmar seu email. Após o cadastro, você terá acesso completo à plataforma."
      },
      {
        question: "Posso ter mais de um tipo de conta?",
        answer: "Sim! Você pode ter tanto uma conta de doador quanto uma conta de ONG. Basta fazer o cadastro específico para cada tipo. No entanto, você precisará usar emails diferentes para cada tipo de conta."
      },
      {
        question: "Como atualizar meus dados cadastrais?",
        answer: "Você pode atualizar seus dados a qualquer momento acessando seu perfil. Lá você encontrará opções para alterar informações pessoais, endereço, preferências de contato e configurações de privacidade."
      }
    ],
    "Tipos de Doações": [
      {
        question: "Quais tipos de doações são aceitas?",
        answer: "Aceitamos diversos tipos de doações: dinheiro, alimentos, roupas, brinquedos e remédios. Cada ONG pode especificar quais tipos de doações está aceitando no momento. Para doações em dinheiro, oferecemos várias opções de pagamento, incluindo cartão de crédito, PIX e boleto bancário."
      },
      {
        question: "Como funciona a doação de itens físicos?",
        answer: "Para doações de itens físicos, você pode: 1) Verificar a lista de itens necessários na página da ONG, 2) Selecionar os itens que deseja doar, 3) Combinar com a ONG o melhor método de entrega (pode ser retirada ou entrega em pontos específicos), 4) Receber um comprovante de doação após a entrega."
      },
      {
        question: "Posso fazer doações recorrentes?",
        answer: "Sim! Oferecemos a opção de doações recorrentes para quem deseja contribuir regularmente. Você pode escolher o valor e a periodicidade (mensal, trimestral ou anual) e cancelar a qualquer momento."
      }
    ],
    "Processo de Doação": [
      {
        question: "Como funciona o processo de doação?",
        answer: "O processo é simples: 1) Navegue pelas ONGs cadastradas, 2) Escolha a causa que deseja apoiar, 3) Selecione o tipo de doação, 4) Siga as instruções específicas da ONG, 5) Confirme sua doação, 6) Receba o comprovante e acompanhe o impacto da sua doação."
      },
      {
        question: "Como posso acompanhar minhas doações?",
        answer: "Você pode acompanhar todas as suas doações através do seu perfil. Lá você encontrará: histórico de doações, status de cada doação, comprovantes, relatórios de impacto e feedback das ONGs beneficiadas."
      },
      {
        question: "Posso doar anonimamente?",
        answer: "Sim, você pode optar por fazer doações anônimas. Neste caso, a ONG receberá a doação sem ter acesso aos seus dados pessoais. No entanto, você ainda receberá o comprovante da doação para fins de documentação."
      }
    ],
    "ONGs e Instituições": [
      {
        question: "Como posso verificar se uma ONG é confiável?",
        answer: "Todas as ONGs em nossa plataforma passam por um rigoroso processo de verificação que inclui: documentação oficial, histórico de atividades, avaliações de outros doadores e visitas técnicas. Você pode verificar todas essas informações na página da ONG, incluindo documentos oficiais, relatórios de atividades e depoimentos."
      },
      {
        question: "Como uma ONG pode se cadastrar na plataforma?",
        answer: "ONGs interessadas devem: 1) Preencher o formulário de cadastro específico, 2) Enviar documentação comprobatória, 3) Passar pelo processo de verificação, 4) Após aprovada, a ONG receberá treinamento sobre o uso da plataforma e poderá começar a receber doações."
      },
      {
        question: "Como as ONGs prestam contas das doações?",
        answer: "As ONGs são obrigadas a prestar contas regularmente através da plataforma, incluindo: relatórios financeiros, fotos e descrições das ações realizadas, comprovantes de gastos e impacto gerado. Tudo isso fica disponível para os doadores acompanharem."
      }
    ],
    "Suporte e Dúvidas": [
      {
        question: "Como posso entrar em contato com o suporte?",
        answer: "Você pode entrar em contato conosco de várias formas: através do formulário na página de contato, pelo email suporte@helphand.com.br, pelo telefone (11) 1234-5678 ou pelo chat online disponível na plataforma. Nossa equipe está disponível de segunda a sexta, das 9h às 18h."
      },
      {
        question: "O que fazer em caso de problemas com uma doação?",
        answer: "Em caso de problemas, você deve: 1) Verificar o status da doação em seu perfil, 2) Tentar resolver diretamente com a ONG, 3) Se não conseguir resolver, entrar em contato com nosso suporte. Para doações em dinheiro, temos um processo específico de resolução de disputas."
      },
      {
        question: "Posso sugerir melhorias para a plataforma?",
        answer: "Sim! Valorizamos muito o feedback dos usuários. Você pode enviar sugestões através do formulário de contato ou participar de nossas pesquisas de satisfação. Periodicamente, implementamos melhorias baseadas nas sugestões recebidas."
      }
    ]
  };

  return (
    <FAQContainer>
      <Title>Perguntas Frequentes</Title>
      
      {Object.entries(faqData).map(([category, items], categoryIndex) => (
        <div key={categoryIndex}>
          <CategoryTitle>{category}</CategoryTitle>
          {items.map((item, index) => (
            <FAQItem key={index}>
              <Question onClick={() => toggleItem(`${categoryIndex}-${index}`)}>
                {item.question}
                <span>{expandedItems[`${categoryIndex}-${index}`] ? '−' : '+'}</span>
              </Question>
              {expandedItems[`${categoryIndex}-${index}`] && (
                <Answer>{item.answer}</Answer>
              )}
            </FAQItem>
          ))}
        </div>
      ))}
    </FAQContainer>
  );
};

export default FAQ; 