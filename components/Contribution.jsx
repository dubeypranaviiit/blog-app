import React from "react";
import CheckOut from "./CheckOut";

const Contribution = () => {
  return (
    <section className="bg-white py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto text-center">
        <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
          Support Our Mission
        </h2>
        <p className="text-lg text-gray-600 mb-8">
          Your contribution helps us keep publishing thoughtful, researched, and impactful articles that matter.
        </p>
    <CheckOut />
      </div>
    </section>
  );
};

export default Contribution;
