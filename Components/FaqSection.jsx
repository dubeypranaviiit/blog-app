'use client'
import { useState } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";

const faqData = [
  {
    question: "What is CurioBlog?",
    answer: "CurioBlog is a secure blogging platform where registered users can write, publish, and explore content. An account is required to access all features.",
  },
  {
    question: "Can I read blogs without an account?",
    answer: "No. CurioBlog is a members-only platform. You must log in or sign up to read, write, or interact with blogs.",
  },
  {
    question: "How do I create an account?",
    answer: "Click on the 'Sign Up' button in the top navigation bar and fill in your details to get started.",
  },
  {
    question: "Is my content private?",
    answer: "Yes. Your content is secure and only visible to logged-in users. You control your post visibility and account settings.",
  },
  {
    question: "Can I follow other authors?",
    answer: "Absolutely. Once logged in, you can follow writers, like posts, and get notified of new articles from your favorite bloggers.",
  },
];

const FaqSection = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleIndex = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-18 px-6 max-w-7xl mx-auto bg-white text-black">
         <h2 className="text-4xl font-bold text-center mb-16 tracking-tight">
                       Frequently Asked Questions
                          </h2>
      <div className="max-w-4xl mx-auto">
        {faqData.map((item, index) => (
          <div key={index} className="border-b border-gray-300 py-4">
            <button
              className="w-full text-left flex justify-between items-center font-semibold text-lg focus:outline-none"
              onClick={() => toggleIndex(index)}
            >
              <span>{item.question}</span>
              {openIndex === index ? <FaChevronUp /> : <FaChevronDown />}
            </button>
            {openIndex === index && (
              <p className="mt-3 text-gray-700 transition-all duration-300 ease-in-out">
                {item.answer}
              </p>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};

export default FaqSection;
