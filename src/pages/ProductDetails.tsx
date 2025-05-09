import React from 'react';
import { useParams } from 'react-router-dom';
import { useAdminData } from '@/context/AdminDataContext';
import ContactForm from '@/components/ui/ContactForm';

const ProductDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { products } = useAdminData();
  
  const product = products.find(p => p.id === Number(id));

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold text-red-600">Продукт не найден</h1>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <img
            src={typeof product.image === 'string' ? product.image : URL.createObjectURL(product.image)}
            alt={product.name}
            className="w-full h-auto rounded-lg shadow-md"
          />
        </div>
        <div>
          <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
          <p className="text-gray-600 mb-6">{product.description}</p>
          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-2">Цена:</h2>
            <p className="text-gray-700">{product.price}</p>
          </div>
          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-2">Категория:</h2>
            <p className="text-gray-700">{product.category}</p>
          </div>
        </div>
      </div>

      <div className="mt-12">
        <h2 className="text-2xl font-bold mb-6">Заказать продукт</h2>
        <ContactForm
          title="Оставить заявку"
          subtitle="Заполните форму, и мы свяжемся с вами для обсуждения деталей заказа"
          productName={product.name}
        />
      </div>
    </div>
  );
};

export default ProductDetails; 