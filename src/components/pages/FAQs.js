import React from "react";
import "../pages/styles/FAQs.css"; // Adjust the path as necessary

const FAQs = () => {
  const faqData = [
    {
      question: "Como posso doar?",
      answer: "Você pode doar através do nosso site, escolhendo a ONG que deseja ajudar e seguindo as instruções de doação.",
    },
    {
      question: "Quais tipos de doações são aceitas?",
      answer: "Aceitamos doações de dinheiro, comida, roupas, brinquedos e remédios.",
    },
    {
      question: "Como as doações são utilizadas?",
      answer: "As doações são utilizadas pelas ONGs para ajudar pessoas em situação de vulnerabilidade, fornecendo alimentos, roupas, brinquedos e assistência médica.",
    },
  ];

  return (
    <div className="faqs">
      <h1 className="faqs-title">Perguntas Frequentes</h1>
      <div className="faq-list">
        {faqData.map((faq, index) => (
          <div className="faq-item" key={index}>
            <h3 className="faq-question">{faq.question}</h3>
            <p className="faq-answer">{faq.answer}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQs;
