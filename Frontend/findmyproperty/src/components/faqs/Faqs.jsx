import React, { useState } from 'react';
import './faqs.css';

const faqs = [
  {
    question: "How do I schedule a property visit?",
    answer: "You can click the 'Book a Visit' button on any property detail page and choose your preferred date and time."
  },
  {
    question: "Can I list my own property?",
    answer: "Yes! Create an account and click on 'Post Property'. Fill in all required details and submit."
  },
  {
    question: "Are the property prices negotiable?",
    answer: "Some sellers are open to negotiation. You can use the contact form to make an offer."
  },
  {
    question: "Is there any brokerage fee?",
    answer: "We do not charge users any brokerage fee. All deals are directly between buyers and sellers."
  },
];

const Faqs = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section className="faq-section parallax-faq">
  <div className="faq-overlay">
    <h2 className="faq-title">Frequently Asked Questions</h2>
    <div className="faq-list">
      {faqs.map((faq, index) => (
        <div
          className={`faq-item ${activeIndex === index ? 'active' : ''}`}
          key={index}
          onClick={() => toggleFAQ(index)}
        >
          <div className="faq-question">
            {faq.question}
            <span className="arrow">{activeIndex === index ? '−' : '+'}</span>
          </div>
          <div className="faq-answer">
            <p>{faq.answer}</p>
          </div>
        </div>
      ))}
    </div>
  </div>
</section>

  );
};

export default Faqs;
