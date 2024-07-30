import { render, screen } from '@testing-library/react';
import { describe, test, expect, vi } from 'vitest';
import '@testing-library/jest-dom';
import InfoComponent from '../components/InfoComponent';
import { useCompany } from '../../shared/components/CompanyContext';
import { renderComponentIcons } from '../components/RenderTreeIcon';

vi.mock('../../shared/components/CompanyContext', () => ({
  useCompany: vi.fn()
}));

vi.mock('../components/RenderTreeIcon', () => ({
  renderComponentIcons: vi.fn()
}));

vi.mock('../../shared/components/CircleIconText', () => ({
  default: ({ text }: { text: string }) => <div>{text}</div>
}));

describe('InfoComponent', () => {
  test('renders selected component details', () => {
    const selectedComponent = {
      name: 'Componente - Teste',
      id: '656a07bbf2d4a1001e2144c2',
      sensorType: 'energy',
      status: 'operating',
    };

    (useCompany as any).mockReturnValue({ selectedComponent });

    render(<InfoComponent />);

    expect(screen.getByText('Componente - Teste')).toBeInTheDocument();

    expect(renderComponentIcons).toHaveBeenCalledWith({
      sensorType: 'energy',
      status: 'operating'
    });

    expect(screen.getByText('Adicionar imagem do Ativo')).toBeInTheDocument();

    expect(screen.getByText('Componente de energia')).toBeInTheDocument();
    expect(screen.getByText('Elétrica')).toBeInTheDocument();

    expect(screen.getByText('656A07B')).toBeInTheDocument();
    expect(screen.getByText('E2144C2')).toBeInTheDocument();

    expect(screen.getByText('Operando')).toBeInTheDocument();
  });

  test('renders default message when no component is selected', () => {
    (useCompany as any).mockReturnValue({ selectedComponent: null });

    render(<InfoComponent />);

    expect(screen.getByText('Selecione um componente')).toBeInTheDocument();
  });
});
