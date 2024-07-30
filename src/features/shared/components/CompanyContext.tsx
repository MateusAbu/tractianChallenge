import React, { createContext, useState, useContext, ReactNode } from 'react';
import { TreeItem } from '../../treeView/treeView.types';

type CompanyContextType = {
  selectedCompany: string;
  setSelectedCompany: (company: string) => void;
  selectedComponent: TreeItem | null;
  setSelectedComponent: (component: TreeItem | null) => void;
  clearSelectedComponent: () => void;
};

const CompanyContext = createContext<CompanyContextType | undefined>(undefined);

export const CompanyProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [selectedCompany, setSelectedCompany] = useState<string>('Apex Unit');
  const [selectedComponent, setSelectedComponent] = useState<TreeItem | null>(null);

  const clearSelectedComponent = () => setSelectedComponent(null);

  return (
    <CompanyContext.Provider 
      value={{ 
        selectedCompany,
        setSelectedCompany,
        selectedComponent,
        setSelectedComponent,
        clearSelectedComponent
      }}>
        {children}
    </CompanyContext.Provider>
  );
};

export const useCompany = () => {
  const context = useContext(CompanyContext);
  if (!context) {
    throw new Error('useCompany deve estar dentro de CompanyProvider');
  }
  return context;
};
