'use client';
import axios from 'axios';
import { useState } from 'react';
import {
  FaPhone,
  FaEnvelope,
  FaMapMarkerAlt,
  FaLinkedin,
  FaTwitter,
  FaInstagram,
} from 'react-icons/fa';

const Contact = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    message: '',
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const validateForm = () => {
    const newErrors = {};
    if (formData.fullName.length < 3) newErrors.fullName = 'Name must be at least 3 characters';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = 'Invalid email';
    if (
      formData.phone &&
      !/^\+?[1-9]\d{1,14}$/.test(formData.phone.replace(/\D/g, ''))
    )
      newErrors.phone = 'Invalid phone number';
    if (formData.message.length < 10) newErrors.message = 'Message too short';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

const handleSubmit = async (e) => {
  e.preventDefault();

  if (validateForm()) {
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      console.log("📤 Sending data:", formData);
      console.log("📡 POST to:", `${window.location.origin}/api/contact`);

      const response = await axios.post(`${window.location.origin}/api/contact`, formData, {
        headers: { 'Content-Type': 'application/json' },
      });

      console.log("✅ Response from API:", response.data);

      if (response.status === 200) {
        setSubmitStatus('success');
        setFormData({ fullName: '', email: '', phone: '', message: '' });
      } else {
        setSubmitStatus('error');
      }
    } catch (err) {
      console.error('❌ Axios error:', err.response?.data || err.message, err);
      setSubmitStatus('error');
    }

    setIsSubmitting(false);
  }
};

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  return (
    <>
      <main className="min-h-screen py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Reach Out to Our Team</h2>
<p className="text-lg text-gray-600">
  We’re here to help — whether it’s a quick question, detailed inquiry, or just feedback.
</p>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="bg-white rounded-xl shadow-lg p-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                {['fullName', 'email', 'phone'].map((field) => (
                  <div key={field}>
                    <label htmlFor={field} className="block text-sm font-medium text-gray-700">
                      {field === 'fullName'
                        ? 'Full Name'
                        : field === 'email'
                        ? 'Email Address'
                        : 'Phone Number (Optional)'}
                    </label>
                    <input
                      type={field === 'email' ? 'email' : field === 'phone' ? 'tel' : 'text'}
                      id={field}
                      name={field}
                      value={formData[field]}
                      onChange={handleChange}
                      className={`mt-1 block w-full rounded-md border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                        errors[field] ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder={`Enter your ${
                        field === 'fullName'
                          ? 'full name'
                          : field === 'email'
                          ? 'email address'
                          : 'phone number'
                      }`}
                    />
                    {errors[field] && (
                      <p className="mt-1 text-sm text-red-500">{errors[field]}</p>
                    )}
                  </div>
                ))}

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows="4"
                    value={formData.message}
                    onChange={handleChange}
                    className={`mt-1 block w-full rounded-md border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      errors.message ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="Write your message here..."
                  ></textarea>
                  {errors.message && (
                    <p className="mt-1 text-sm text-red-500">{errors.message}</p>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${
                    isSubmitting ? 'bg-blue-400' : 'bg-blue-600 hover:bg-blue-700'
                  } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500`}
                >
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                </button>

                {submitStatus === 'success' && (
                  <div className="p-4 bg-green-100 rounded-md">
                    <p className="text-green-700">Thanks! We'll get back to you soon.</p>
                  </div>
                )}
                {submitStatus === 'error' && (
                  <div className="p-4 bg-red-100 rounded-md">
                    <p className="text-red-700">Something went wrong. Try again.</p>
                  </div>
                )}
              </form>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-8 space-y-8">
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Get in Touch</h3>
                <ContactDetail icon={<FaMapMarkerAlt />} title="Location" text=" Devi Darsan Rd, Khelgaon, Getlatu, Ranchi, Jharkhand 835215" />
                <ContactDetail icon={<FaPhone />} title="Phone" text="+919430190###" />
                <ContactDetail icon={<FaEnvelope />} title="Email" text="contact@curioblog.com" />
              </div>
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-4">Connect With Us</h3>
                <div className="flex space-x-4">
                  {[FaLinkedin, FaTwitter, FaInstagram].map((Icon, i) => (
                    <a
                      href="#"
                      key={i}
                      className="text-gray-400 hover:text-blue-600 transition-colors"
                    >
                      <Icon className="text-2xl" />
                    </a>
                  ))}
                </div>
              </div>
              <iframe
                title="Google Maps"
               src="https://www.google.com/maps?q=BSNL+Training+Centre,+Namkum,+Ranchi&output=embed"
                className="w-full h-64 rounded-lg"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
              ></iframe>
            </div>
          </div>
        </div>
      </main>

  
    </>
  );
};

const ContactDetail = ({ icon, title, text }) => (
  <div className="flex items-start space-x-4 mb-4">
    <div className="text-blue-600 mt-1">{icon}</div>
    <div>
      <h4 className="font-medium text-gray-900">{title}</h4>
      <p className="text-gray-600">{text}</p>
    </div>
  </div>
);

export default Contact;
