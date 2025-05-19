import React, { useState } from "react";
import styled from "styled-components";
import { FiMail } from "react-icons/fi";

const FAQContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
`;

const Title = styled.h1`
  color: #ff6b6b;
  text-align: center;
  margin-bottom: 2rem;
`;

const CategoryTitle = styled.h2`
  color: #333;
  margin: 2rem 0 1rem;
  padding-bottom: 0.5rem;
  border-bottom: 2px solid #ff6b6b;
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
    color: #ff6b6b;
  }
`;

const Answer = styled.p`
  color: #666;
  line-height: 1.6;
  margin-top: 1rem;
  animation: fadeIn 0.2s ease;
`;

const GoogleFormButton = styled.a`
  display: inline-block;
  margin: 1.2rem 0 2.5rem 0;
  padding: 0.9rem 2.2rem;
  background: #ff6b6b;
  color: #fff;
  margin-right: 1rem;
  border-radius: 8px;
  font-size: 1.08rem;
  font-weight: 500;
  text-decoration: none;
  box-shadow: 0 1px 6px rgba(0, 0, 0, 0.04);
  transition: background 0.18s;

  &:hover {
    background: #e55a5a;
  }
`;

const FAQ = () => {
  const [expandedItems, setExpandedItems] = useState({});

  const toggleItem = (index) => {
    setExpandedItems((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  const faqData = {
    "Sobre o HelpHand": [
      {
        question: "O que é o HelpHand?",
        answer:
          "O HelpHand é uma plataforma desenvolvida por alunos da UniDomBosco-RJ dos cursos de Sistemas de Informação e Engenharia de Software juntamente da Startup Nexus TI, ela é uma plataforma inovadora que conecta doadores a ONGs e instituições que precisam de ajuda. Nosso objetivo é facilitar o processo de doação e tornar a ajuda mais acessível a todos. Através do nosso sistema, você pode doar dinheiro, alimentos, roupas, brinquedos e remédios para causas que precisam de apoio, tudo de forma segura e transparente.",
      },
      {
        question: "Como o HelpHand garante a segurança das doações?",
        answer:
          "Implementamos várias medidas de segurança: verificação rigorosa das ONGs cadastradas, sistema de pagamento seguro para doações em dinheiro, rastreamento de doações físicas e feedback dos doadores. Além disso, todas as transações são registradas e podem ser auditadas.",
      },
      {
        question: "O HelpHand cobra alguma taxa?",
        answer:
          "O HelpHand é uma plataforma sem fins lucrativos. Não cobramos taxas sobre as doações. No caso de doações em dinheiro, pode haver uma pequena taxa cobrada pela operadora de pagamento, que é claramente informada antes da confirmação da doação.",
      },
    ],
    "Cadastro e Conta": [
      {
        question: "Como posso me cadastrar na plataforma?",
        answer:
          "Você pode se cadastrar de duas formas: criando uma conta com email e senha ou usando sua conta do Google. O processo é simples e rápido. Basta clicar em 'Entrar' na página inicial, preencher seus dados básicos e confirmar seu email. Após o cadastro, você terá acesso completo à plataforma.",
      },

      {
        question: "Como atualizar meus dados cadastrais?",
        answer:
          "Você pode atualizar seus dados a qualquer momento acessando seu perfil. Lá você encontrará opções para alterar informações pessoais, endereço, preferências de contato e configurações de privacidade.",
      },
    ],
    "Tipos de Doações": [
      {
        question: "Quais tipos de doações são aceitas?",
        answer:
          "Aceitamos diversos tipos de doações: dinheiro, alimentos, roupas, brinquedos e remédios. Cada ONG pode especificar quais tipos de doações está aceitando no momento. Para doações em dinheiro, oferecemos várias opções de pagamento, incluindo cartão de crédito, PIX e boleto bancário.",
      },
      {
        question: "Como funciona a doação de itens físicos?",
        answer:
          "Para doações de itens físicos, você pode: 1) Verificar a lista de itens necessários na página da ONG, 2) Selecionar os itens que deseja doar, 3) Combinar com a ONG o melhor método de entrega (pode ser retirada ou entrega em pontos específicos), 4) Receber um comprovante de doação após a entrega.",
      },
    ],
    "Processo de Doação": [
      {
        question: "Como funciona o processo de doação?",
        answer:
          "O processo é simples: 1) Navegue pelas ONGs cadastradas, 2) Escolha a causa que deseja apoiar, 3) Veja as necessidades da, 4) Siga as instruções específicas da ONG, 5) Confirme sua doação, 6) Receba o comprovante e acompanhe o impacto da sua doação.",
      },
      {
        question: "Como posso acompanhar minhas doações?",
        answer:
          "Você poderá futuramente acompanhar todas as suas doações através do seu perfil. Lá você encontrará: histórico de doações, status de cada doação, comprovantes. Porém ainda não temos essa funcionalidade disponível. Assim que estiver ativa, você receberá uma notificação por email.",
      },
      {
        question: "Posso doar anonimamente?",
        answer:
          "Infelizmente para o nosso controle de doações feitas ainda não é possível. No entanto, as ongs não terão acesso aos seus dados pessoais. Apenas o HelpHand terá acesso a essas informações.",
      },
    ],
    "ONGs e Instituições": [
      {
        question: "Como posso verificar se uma ONG é confiável?",
        answer:
          "Todas as ONGs em nossa plataforma passam por um processo de verificação que inclui: documentação oficial, histórico de atividades, avaliações de outros doadores e visitas técnicas. Você pode verificar todas essas informações na página da ONG, incluindo documentos oficiais, relatórios de atividades e depoimentos.",
      },
      {
        question: "Como uma ONG pode se cadastrar na plataforma?",
        answer:
          "ONGs interessadas devem entrar em contato conosco pelo instagram @help.handscommunity ou no formulário no nosso site e nos enviar os dados necessários: nome da ONG, CNPJ (se possuir), endereço, telefone e email. Após a análise, entraremos em contato para confirmar o cadastro.",
      },
      {
        question: "Posso sugerir uma ONG para ser cadastrada?",
        answer:
          "Sim! Valorizamos muito a participação da comunidade. Você pode sugerir uma ONG através do nosso instagram @help.handscommunity ou pelo formulário de contato em nosso site. Nossa equipe analisará a sugestão e, se a ONG atender aos nossos critérios, entraremos em contato para o cadastro.",
      },
    ],
    "Suporte e Dúvidas": [
      {
        question: "Como posso entrar em contato com o suporte?",
        answer:
          "Você pode entrar em contato conosco de várias formas: através do formulário na página de contato, pelo instagram help.handscommunity, pelo telefone (24) 98868-5043.",
      },

      {
        question: "Posso sugerir melhorias para a plataforma?",
        answer:
          "Sim! Valorizamos muito o feedback dos usuários. Você pode enviar sugestões através do formulário de contato ou participar de nossas pesquisas de satisfação. Periodicamente, implementamos melhorias baseadas nas sugestões recebidas.",
      },
    ],
  };

  return (
    <FAQContainer>
      <Title>Perguntas Frequentes</Title>

      <GoogleFormButton
        href="https://forms.gle/KPrB7VFvdH9Wz12X7"
        target="_blank"
        rel="noopener noreferrer"
      >
        <FiMail style={{ marginRight: 8, marginBottom: -2 }} /> 
        Feedback
      </GoogleFormButton>

      <GoogleFormButton
        href="https://forms.gle/UgB3gwDNR1LmBVSZ8"
        target="_blank"
        rel="noopener noreferrer"
      >
        <FiMail style={{ marginRight: 8, marginBottom: -2 }} /> Cadastro de Ongs
      </GoogleFormButton>

      {Object.entries(faqData).map(([category, items], categoryIndex) => (
        <div key={categoryIndex}>
          <CategoryTitle>{category}</CategoryTitle>
          {items.map((item, index) => (
            <FAQItem key={index}>
              <Question onClick={() => toggleItem(`${categoryIndex}-${index}`)}>
                {item.question}
                <span>
                  {expandedItems[`${categoryIndex}-${index}`] ? "−" : "+"}
                </span>
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
