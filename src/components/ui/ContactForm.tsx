import React, { useState } from 'react';
import { useInquiries } from '@/context/InquiriesContext';
import { toast } from 'sonner';

interface ContactFormProps {
  title?: string;
  subtitle?: string;
  productName?: string;
  vacancyTitle?: string;
  onSubmitSuccess?: () => void;
}

const ContactForm: React.FC<ContactFormProps> = ({ 
  title = "Свяжитесь с нами", 
  subtitle = "Заполните форму, и мы свяжемся с вами в ближайшее время",
  productName,
  vacancyTitle,
  onSubmitSuccess
}) => {
  const { addInquiry } = useInquiries();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Add the inquiry to the context
      addInquiry({
        type: productName ? 'product' : vacancyTitle ? 'vacancy' : 'contact',
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        message: formData.message,
        productName,
        vacancyTitle
      });

      // Reset form
      setFormData({ name: '', email: '', phone: '', message: '' });
      setSubmitSuccess(true);
      toast.success('Ваше сообщение успешно отправлено!');
      
      // Reset success message after 3 seconds
      setTimeout(() => setSubmitSuccess(false), 3000);
      
      // Call onSubmitSuccess callback if provided
      if (onSubmitSuccess) {
        onSubmitSuccess();
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      toast.error('Произошла ошибка при отправке формы. Пожалуйста, попробуйте еще раз.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="bg-white p-8 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-2">{title}</h2>
      <p className="text-gray-600 mb-6">{subtitle}</p>

      {submitSuccess && (
        <div className="mb-6 p-4 bg-green-100 text-green-700 rounded-md">
          Спасибо за ваше обращение! Мы свяжемся с вами в ближайшее время.
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
            Ваше имя *
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-agro focus:border-transparent"
          />
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
            Email *
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-agro focus:border-transparent"
          />
        </div>

        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
            Телефон *
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-agro focus:border-transparent"
          />
        </div>

        <div>
          <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
            Сообщение *
          </label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            required
            rows={4}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-agro focus:border-transparent"
          />
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-agro hover:bg-agro-dark text-white font-bold py-3 px-4 rounded-md transition-colors duration-300 disabled:opacity-50"
        >
          {isSubmitting ? 'Отправка...' : 'Отправить'}
        </button>
      </form>
    </div>
  );
};

export default ContactForm;
