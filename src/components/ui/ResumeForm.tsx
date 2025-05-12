import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { CheckCircle2 } from "lucide-react";
import { useInquiries } from '@/context/InquiriesContext';
import { toast } from 'sonner';

interface ResumeFormProps {
  vacancyTitle: string;
}

const ResumeForm: React.FC<ResumeFormProps> = ({ vacancyTitle }) => {
  const { addInquiry } = useInquiries();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    position: "",
    message: "",
    resume: null as File | null,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Prepare resume message text based on whether a file was uploaded
      const resumeText = formData.resume ? `Резюме: ${formData.resume.name}` : 'Резюме: Не прикреплено';
      
      // Add the inquiry to the context
      addInquiry({
        type: 'vacancy',
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        message: `${formData.message}\n\nЖелаемая должность: ${formData.position}\n${resumeText}`,
        vacancyTitle
      });

      // Reset form
      setFormData({
        name: "",
        email: "",
        phone: "",
        position: "",
        message: "",
        resume: null,
      });
      setSubmitSuccess(true);
      toast.success('Ваша заявка успешно отправлена!');
      
      // Reset success message after 3 seconds
      setTimeout(() => setSubmitSuccess(false), 3000);
    } catch (error) {
      console.error('Error submitting form:', error);
      toast.error('Произошла ошибка при отправке формы. Пожалуйста, попробуйте еще раз.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData((prev) => ({ ...prev, resume: e.target.files![0] }));
    }
  };

  if (submitSuccess) {
    return (
      <div className="flex flex-col items-center justify-center p-8 bg-white rounded-lg shadow-md">
        <CheckCircle2 className="w-16 h-16 text-green-500 mb-4 animate-bounce" />
        <h3 className="text-xl font-semibold text-gray-800 mb-2">Резюме успешно отправлено!</h3>
        <p className="text-gray-600 text-center">
          Спасибо за ваше резюме. Мы свяжемся с вами в ближайшее время.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white p-8 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-2">Отклик на вакансию</h2>
      <p className="text-gray-600 mb-6">
        Отправьте свое резюме на вакансию: {vacancyTitle}
      </p>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
              ФИО *
            </label>
            <Input
              id="name"
              name="name"
              type="text"
              required
              value={formData.name}
              onChange={handleChange}
              className="w-full"
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email *
            </label>
            <Input
              id="email"
              name="email"
              type="email"
              required
              value={formData.email}
              onChange={handleChange}
              className="w-full"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
              Телефон *
            </label>
            <Input
              id="phone"
              name="phone"
              type="tel"
              required
              value={formData.phone}
              onChange={handleChange}
              className="w-full"
            />
          </div>
          <div>
            <label htmlFor="position" className="block text-sm font-medium text-gray-700 mb-1">
              Желаемая должность *
            </label>
            <Input
              id="position"
              name="position"
              type="text"
              required
              value={formData.position}
              onChange={handleChange}
              className="w-full"
            />
          </div>
        </div>

        <div>
          <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
            Сопроводительное письмо *
          </label>
          <Textarea
            id="message"
            name="message"
            required
            value={formData.message}
            onChange={handleChange}
            className="w-full min-h-[120px]"
            placeholder="Расскажите о себе и своем опыте работы"
          />
        </div>

        <div>
          <label htmlFor="resume" className="block text-sm font-medium text-gray-700 mb-1">
            Резюме (PDF, DOC, DOCX) (необязательно)
          </label>
          <Input
            id="resume"
            name="resume"
            type="file"
            accept=".pdf,.doc,.docx"
            onChange={handleFileChange}
            className="w-full"
          />
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-agro hover:bg-agro-dark text-white font-bold py-3 px-4 rounded-md transition-colors duration-300 disabled:opacity-50"
        >
          {isSubmitting ? 'Отправка...' : 'Отправить резюме'}
        </button>
      </form>
    </div>
  );
};

export default ResumeForm;
