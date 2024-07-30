import { render, screen, fireEvent } from '@testing-library/react';
import { describe, test, expect, vi, beforeEach } from 'vitest';
import '@testing-library/jest-dom';
import TreeViewScreen from '../components/TreeViewScreen';
import { useCompany } from '../../shared/components/CompanyContext';

vi.mock('../../shared/components/CompanyContext', () => ({
  useCompany: vi.fn()
}));

vi.mock('../components/TreeComponent', () => ({
  default: () => <div>TreeComponent</div>
}));

vi.mock('../components/InfoComponent', () => ({
  default: () => <div>InfoComponent</div>
}));

describe('TreeViewScreen', () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  test('renders TreeViewScreen and handles filter changes', async () => {
    (useCompany as any).mockReturnValue({
      selectedCompany: 'TestCompany',
      clearSelectedComponent: vi.fn()
    });

    global.fetch = vi.fn((url: string) =>
      Promise.resolve({
        json: () => Promise.resolve(
          url.includes('locations') 
            ? [{ id: '1', name: 'Location 1', type: 'location', parentId: null }]
            : [{ id: '2', name: 'Asset 1', locationId: '1', type: 'asset' }]
        )
      })
    ) as any;

    render(<TreeViewScreen />);

    expect(screen.getByText('Ativos')).toBeInTheDocument();
    expect(screen.getByText('/ TestCompany')).toBeInTheDocument();
    expect(screen.getByText('Sensor de Energia')).toBeInTheDocument();
    expect(screen.getByText('Crítico')).toBeInTheDocument();

    expect(screen.getByText('TreeComponent')).toBeInTheDocument();
    expect(screen.getByText('InfoComponent')).toBeInTheDocument();

    const energyButton = screen.getByText('Sensor de Energia');
    const criticalButton = screen.getByText('Crítico');

    fireEvent.click(energyButton);

    const energyButtonStyle = window.getComputedStyle(energyButton);
    expect(energyButtonStyle.backgroundColor).toBe('rgb(33, 136, 255)');

    fireEvent.click(criticalButton);

    const criticalButtonStyle = window.getComputedStyle(criticalButton);
    expect(criticalButtonStyle.backgroundColor).toBe('rgb(33, 136, 255)');
  });

  test('handles fetch data errors gracefully', async () => {
    global.fetch = vi.fn(() => Promise.reject(new Error('Fetch error'))) as any;

    (useCompany as any).mockReturnValue({
      selectedCompany: 'TestCompany',
      clearSelectedComponent: vi.fn()
    });

    render(<TreeViewScreen />);

    expect(screen.getByText('Ativos')).toBeInTheDocument();
    expect(screen.getByText('/ TestCompany')).toBeInTheDocument();
    expect(screen.getByText('Sensor de Energia')).toBeInTheDocument();
    expect(screen.getByText('Crítico')).toBeInTheDocument();
  });
});
