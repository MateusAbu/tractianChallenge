import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import { useCompany } from '../../shared/components/CompanyContext';
import { beforeEach, describe, expect, test, vi } from 'vitest';
import Navbar  from '../components/Navbar';

vi.mock('../../shared/components/CompanyContext', () => ({
  useCompany: vi.fn(),
}));

describe('Navbar', () => {
  beforeEach(() => {
    (useCompany as any).mockReturnValue({
      selectedCompany: 'Apex Unit',
      setSelectedCompany: vi.fn(),
    });
  });

  test('renders Navbar and menu items', () => {
    render(<Navbar />);

    expect(screen.getByAltText('Tractian Logo')).toBeInTheDocument();

    ['Apex Unit', 'Tobias Unit', 'Jaguar Unit'].forEach((unit) => {
      expect(screen.getByText(unit)).toBeInTheDocument();
    });
  });

  test('highlights the selected button and updates selection on click', () => {
    render(<Navbar />);

    const TobiasButton = screen.getByText('Tobias Unit');

    fireEvent.click(TobiasButton);

    expect(useCompany().setSelectedCompany).toHaveBeenCalledWith('Tobias Unit');
  });
});
