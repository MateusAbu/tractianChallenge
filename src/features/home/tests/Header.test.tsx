import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import { useCompany } from '../../shared/components/CompanyContext';
import { beforeEach, describe, expect, test, vi } from 'vitest';
import Header  from '../components/Header';

vi.mock('../../shared/components/CompanyContext', () => ({
  useCompany: vi.fn(),
}));

describe('Header', () => {
  beforeEach(() => {
    (useCompany as any).mockReturnValue({
      selectedCompany: 'Apex Unit',
      setSelectedCompany: vi.fn(),
    });
  });

  test('renders Header and menu items', () => {
    render(<Header />);

    expect(screen.getByAltText('Tractian Logo')).toBeInTheDocument();

    ['Apex Unit', 'Tobias Unit', 'Jaguar Unit'].forEach((unit) => {
      expect(screen.getByText(unit)).toBeInTheDocument();
    });
  });

  test('highlights the selected button and updates selection on click', () => {
    render(<Header />);

    const TobiasButton = screen.getByText('Tobias Unit');

    fireEvent.click(TobiasButton);

    expect(useCompany().setSelectedCompany).toHaveBeenCalledWith('Tobias Unit');
  });
});
