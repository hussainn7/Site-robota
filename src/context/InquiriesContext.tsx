import React, { createContext, useContext, useState, useEffect } from 'react';

export interface Inquiry {
  id: number;
  type: 'product' | 'vacancy' | 'contact';
  name: string;
  email: string;
  phone: string;
  message: string;
  productName?: string;
  vacancyTitle?: string;
  date: string;
  status: 'new' | 'in-progress' | 'completed';
}

interface InquiriesContextType {
  inquiries: Inquiry[];
  addInquiry: (inquiry: Omit<Inquiry, 'id' | 'date' | 'status'>) => void;
  updateInquiryStatus: (id: number, status: Inquiry['status']) => void;
  deleteInquiry: (id: number) => void;
}

const InquiriesContext = createContext<InquiriesContextType | undefined>(undefined);

export const useInquiries = () => {
  const context = useContext(InquiriesContext);
  if (!context) {
    throw new Error('useInquiries must be used within an InquiriesProvider');
  }
  return context;
};

export const InquiriesProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [inquiries, setInquiries] = useState<Inquiry[]>(() => {
    const stored = localStorage.getItem('inquiries');
    return stored ? JSON.parse(stored) : [];
  });

  useEffect(() => {
    localStorage.setItem('inquiries', JSON.stringify(inquiries));
  }, [inquiries]);

  const addInquiry = (inquiry: Omit<Inquiry, 'id' | 'date' | 'status'>) => {
    const newInquiry: Inquiry = {
      ...inquiry,
      id: Date.now(),
      date: new Date().toISOString(),
      status: 'new'
    };
    setInquiries(prev => [...prev, newInquiry]);
  };

  const updateInquiryStatus = (id: number, status: Inquiry['status']) => {
    setInquiries(prev =>
      prev.map(inquiry =>
        inquiry.id === id ? { ...inquiry, status } : inquiry
      )
    );
  };

  const deleteInquiry = (id: number) => {
    setInquiries(prev => prev.filter(inquiry => inquiry.id !== id));
  };

  return (
    <InquiriesContext.Provider
      value={{
        inquiries,
        addInquiry,
        updateInquiryStatus,
        deleteInquiry
      }}
    >
      {children}
    </InquiriesContext.Provider>
  );
}; 