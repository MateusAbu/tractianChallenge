import { render, screen, fireEvent } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest';
import '@testing-library/jest-dom';

import { useCompany } from '../../shared/components/CompanyContext';
import { TreeItem } from '../treeView.types';
import TreeComponent from '../components/TreeComponent';

vi.mock('../../shared/components/CompanyContext', () => ({
  useCompany: vi.fn(),
}));

const mockSetSelectedComponent = vi.fn();

const mockUseCompany = {
  setSelectedComponent: mockSetSelectedComponent,
};

const mockTreeData: TreeItem[] = [
  {
    "id": "656a07b3f2d4a1001e2144bf",
    "name": "Location 1",
    "type": "location",
    "children": [
      {
        "id": "2",
        "name": "Asset 1",
        "type": "asset",
        "children": [],
        "sensorType": null,
        "status": null
      },
      {
        "id": "656a07bbf2d4a1001e2144c2",
        "name": "Component 1",
        "type": "component",
        "children": [],
        "sensorType": "energy",
        "status": null
      }
    ]
  },
  {
    "id": "656a07b3f2d4a1001e2144b5",
    "name": "Location 2",
    "type": "location",
    "children": []
  },
  {
    "id": "656734448eb037001e474a62",
    "name": "Component 2",
    "type": "component",
    "children": [],
    "sensorType": null,
    "status": null
  },
  {
    "id": "656734448eb037001e474a66",
    "name": "Asset 2",
    "type": "asset",
    "children": [],
    "sensorType": null,
    "status": null
  }
];

describe('TreeComponent', () => {
  beforeEach(() => {
    (useCompany as any).mockReturnValue(mockUseCompany);
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  test('renders tree nodes correctly', () => {
    render(<TreeComponent treeData={mockTreeData} filter="" />);
    expect(screen.getByText('Location 1')).toBeInTheDocument();
    expect(screen.getByText('Location 2')).toBeInTheDocument();
    expect(screen.getByText('Asset 1')).toBeInTheDocument();
    expect(screen.getByText('Asset 2')).toBeInTheDocument();
    expect(screen.getByText('Component 1')).toBeInTheDocument();
    expect(screen.getByText('Component 2')).toBeInTheDocument();
  });

  test('expands and collapses tree nodes on click', () => {
    render(<TreeComponent treeData={mockTreeData} filter="" />);
    const locationNode = screen.getByText('Location 1');
    const assetNode = screen.getByText('Asset 1');

    expect(assetNode).toBeVisible();

    fireEvent.click(locationNode);
    expect(screen.queryByText('Asset 1')).not.toBeInTheDocument();
    
    fireEvent.click(locationNode);
    expect(screen.getByText('Asset 1')).toBeVisible();
  });

  test('filters tree nodes based on search term', () => {
    render(<TreeComponent treeData={mockTreeData} filter="" />);
    const searchInput = screen.getByPlaceholderText('Buscar Ativo ou Local');

    fireEvent.change(searchInput, { target: { value: 'Component' } });
    expect(screen.queryByText('Component 1')).toBeInTheDocument();
    expect(screen.queryByText('Asset 1')).not.toBeInTheDocument();

    fireEvent.change(searchInput, { target: { value: '' } });
    expect(screen.getByText('Location 1')).toBeVisible();
    expect(screen.getByText('Asset 1')).toBeVisible();
  });

  test('filters tree nodes based on filter prop', () => {
    render(<TreeComponent treeData={mockTreeData} filter="Sensor de Energia" />);
    expect(screen.getByText('Component 1')).toBeVisible();
    expect(screen.queryByText('Asset 1')).not.toBeInTheDocument();
  });

  test('calls setSelectedComponent on component node click', () => {
    render(<TreeComponent treeData={mockTreeData} filter="" />);
    const componentNode = screen.getByText('Component 2');

    fireEvent.click(componentNode);
    expect(mockSetSelectedComponent).toHaveBeenCalledWith(mockTreeData[2]);
  });
});
