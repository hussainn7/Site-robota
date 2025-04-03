
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

const ResumeForm: React.FC<ResumeFormProps> = ({ vacancyTitle }) => {
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
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h3 className="text-2xl font-bold mb-2">
        {vacancyTitle ? `Вакансия: ${vacancyTitle}` : "Отправить резюме"}
      </h3>
      <p className="text-gray-600 mb-6">
        Заполните форму ниже, чтобы отправить свое резюме
      </p>
      
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <Label htmlFor="name">Имя</Label>
          <Input
            id="name"
            placeholder="Ваше полное имя"
            {...register("name", { required: "Имя обязательно" })}
          />
          {errors.name && (
            <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
          )}
        </div>
        
        <div>
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            placeholder="Ваш email"
            type="email"
            {...register("email", { 
              required: "Email обязателен",
              pattern: {
                value: /\S+@\S+\.\S+/,
                message: "Неверный формат email"
              }
            })}
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
          )}
        </div>
        
        <div>
          <Label htmlFor="phone">Телефон</Label>
          <Input
            id="phone"
            placeholder="Ваш номер телефона"
            type="tel"
            {...register("phone", { required: "Телефон обязателен" })}
          />
          {errors.phone && (
            <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>
          )}
        </div>
        
        <div>
          <Label htmlFor="experience">Опыт работы</Label>
          <Input
            id="experience"
            placeholder="Кратко укажите ваш опыт работы"
            {...register("experience", { required: "Опыт работы обязателен" })}
          />
          {errors.experience && (
            <p className="text-red-500 text-sm mt-1">{errors.experience.message}</p>
          )}
        </div>
        
        <div>
          <Label htmlFor="resume">Резюме (PDF, DOC, DOCX)</Label>
          <div className="flex items-center justify-center w-full">
            <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer hover:bg-gray-50">
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                <Upload className="w-8 h-8 mb-3 text-gray-500" />
                <p className="mb-2 text-sm text-gray-500">
                  <span className="font-semibold">Нажмите для загрузки</span> или перетащите файл
                </p>
                <p className="text-xs text-gray-500">PDF, DOC, DOCX (макс. 10MB)</p>
              </div>
              <input
                id="resume"
                type="file"
                className="hidden"
                accept=".pdf,.doc,.docx"
                {...register("resume", { 
                  required: "Резюме обязательно" 
                })}
                onChange={handleFileChange}
              />
            </label>
          </div>
          {fileName && (
            <p className="text-sm text-gray-600 mt-2">Выбран файл: {fileName}</p>
          )}
          {errors.resume && (
            <p className="text-red-500 text-sm mt-1">{errors.resume.message}</p>
          )}
        </div>
        
        <div>
          <Label htmlFor="coverLetter">Сопроводительное письмо</Label>
          <Textarea
            id="coverLetter"
            placeholder="Расскажите о себе и почему вы подходите на эту должность"
            rows={5}
            {...register("coverLetter")}
          />
        </div>
        
        <Button type="submit" className="w-full" disabled={isSubmitting}>
          {isSubmitting ? "Отправка..." : "Отправить резюме"}
        </Button>
      </form>
    </div>
  );
};

export default ResumeForm;
