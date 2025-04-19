import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { Upload } from "lucide-react";

interface ResumeFormProps {
  vacancyTitle?: string;
}

interface FormValues {
  name: string;
  email: string;
  phone: string;
  experience: string;
  resume: FileList;
  coverLetter: string;
}

const ResumeForm = ({ vacancyTitle }: ResumeFormProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [fileName, setFileName] = useState("");
  
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<FormValues>();

  const onSubmit = async (data: FormValues) => {
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
    
    toast.success("Ваше резюме успешно отправлено!");
    reset();
    setFileName("");
    setIsSubmitting(false);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFileName(e.target.files[0].name);
    }
  };

  return (
    <form className="space-y-3">
      {vacancyTitle && (
        <div className="mb-3">
          <h3 className="text-base font-medium mb-1">Вакансия: {vacancyTitle}</h3>
        </div>
      )}
      
      <div>
        <label htmlFor="name" className="text-sm font-medium block mb-1">
          Имя
        </label>
        <Input id="name" placeholder="Ваше полное имя" />
      </div>

      <div>
        <label htmlFor="email" className="text-sm font-medium block mb-1">
          Email
        </label>
        <Input id="email" type="email" placeholder="Ваш email" />
      </div>

      <div>
        <label htmlFor="phone" className="text-sm font-medium block mb-1">
          Телефон
        </label>
        <Input id="phone" type="tel" placeholder="Ваш номер телефона" />
      </div>

      <div>
        <label htmlFor="experience" className="text-sm font-medium block mb-1">
          Опыт работы
        </label>
        <Input id="experience" placeholder="Кратко укажите ваш опыт работы" />
      </div>

      <div>
        <label htmlFor="resume" className="text-sm font-medium block mb-1">
          Резюме (PDF, DOC, DOCX)
        </label>
        <div className="border-2 border-dashed rounded-lg p-4 text-center cursor-pointer hover:border-primary transition-colors">
          <input
            type="file"
            id="resume"
            className="hidden"
            accept=".pdf,.doc,.docx"
          />
          <div className="text-sm text-muted-foreground">
            <span className="block">Нажмите для загрузки или перетащите файл</span>
            <span className="block text-xs mt-1">PDF, DOC, DOCX (макс. 10MB)</span>
          </div>
        </div>
      </div>

      <div>
        <label htmlFor="cover" className="text-sm font-medium block mb-1">
          Сопроводительное письмо
        </label>
        <textarea
          id="cover"
          className="min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
          placeholder="Расскажите о себе и почему вы подходите на эту должность"
        />
      </div>

      <Button type="submit" className="w-full">
        Отправить резюме
      </Button>
    </form>
  );
};

export default ResumeForm;
