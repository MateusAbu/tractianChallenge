import React, { useState, useEffect } from 'react';
import TreeComponent from './TreeComponent';
import { Box, Content, SubHeader as S } from '../treeView.style';
import { Location, Asset, TreeItem } from '../treeView.types';
import BoltIcon from '@mui/icons-material/Bolt';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import { useCompany } from '../../shared/components/CompanyContext';
import InfoComponent from './InfoComponent';

const TreeViewScreen: React.FC = () => {
  const [treeData, setTreeData] = useState<TreeItem[]>([]);
  const [selectedFilter, setSelectedFilter] = useState('');
  const { selectedCompany, clearSelectedComponent } = useCompany();

  const fetchDataForCompany = async (company: string): Promise<{ locations: Location[], assets: Asset[] }> => {
    try {
        const baseUrl = import.meta.env.BASE_URL || '/';
        const formattedBaseUrl = baseUrl.endsWith('/') ? baseUrl : `${baseUrl}/`;

        const locationsUrl = `${formattedBaseUrl}src/mocks/${company.replace(/\s+/g, '')}/locations.json`;
        const assetsUrl = `${formattedBaseUrl}src/mocks/${company.replace(/\s+/g, '')}/assets.json`;

        const locationsResponse = await fetch(locationsUrl);
        const assetsResponse = await fetch(assetsUrl);

        const locations = await locationsResponse.json();
        const assets = await assetsResponse.json();

        return { locations, assets };
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
};

  useEffect(() => {
    const fetchData = async () => {
      const { locations, assets } = await fetchDataForCompany(selectedCompany);
      const tree = buildTree(locations, assets);
      setTreeData(tree);
      clearSelectedComponent();
    };
    fetchData();
  }, [selectedCompany]);

  const buildTree = (locations: Location[], assets: Asset[]): TreeItem[] => {
    const locationMap: Record<string, TreeItem> = {};
    const assetMap: Record<string, TreeItem> = {};
    const topLevelNodes: TreeItem[] = [];

    locations.forEach((location) => {
      const node: TreeItem = {
        id: location.id,
        name: location.name,
        type: 'location',
        children: [],
      };
      locationMap[location.id] = node;

      if (!location.parentId) {
        topLevelNodes.push(node);
      }
    });

    locations.forEach((location) => {
      if (location.parentId && locationMap[location.parentId]) {
        locationMap[location.parentId].children?.push(locationMap[location.id]);
      }
    });

    assets.forEach((asset) => {
      const node: TreeItem = {
        id: asset.id,
        name: asset.name,
        type: asset.sensorType ? 'component' : 'asset',
        children: [],
        sensorType: asset.sensorType,
        status: asset.status,
      };
      assetMap[asset.id] = node;

      if (!asset.parentId && !asset.locationId) {
        topLevelNodes.push(node);
      } else if (asset.locationId && locationMap[asset.locationId]) {
        locationMap[asset.locationId].children?.push(node);
      } else if (asset.parentId && assetMap[asset.parentId]) {
        assetMap[asset.parentId].children?.push(node);
      }
    });

    return topLevelNodes;
  };

  const handleFilterChange = (filter: string) => {
    setSelectedFilter((prevFilter) => (prevFilter === filter ? '' : filter));
  };

  return (
    <Content>
      <S.Container>
        <div>
          <S.Title>Ativos</S.Title> / {selectedCompany}
        </div>
        <S.MenuButtons>
          {['Sensor de Energia', 'Crítico'].map((filter) => (
            <S.FilterButton
              key={filter}
              $selected={selectedFilter === filter}
              onClick={() => handleFilterChange(filter)}
            >
              {filter === 'Sensor de Energia' && <BoltIcon style={{ marginRight: '8px' }} />}
              {filter === 'Crítico' && <InfoOutlinedIcon style={{ marginRight: '8px' }} />}
              {filter}
            </S.FilterButton>
          ))}
        </S.MenuButtons>
      </S.Container>

      <Box.MenuCard>
        <Box.Card style={{ width: '35%' }}>
          <TreeComponent treeData={treeData} filter={selectedFilter} />
        </Box.Card>
        <Box.Card style={{ width: '65%' }}>
          <InfoComponent />
        </Box.Card>
      </Box.MenuCard>
    </Content>
  );
};

export default TreeViewScreen;
