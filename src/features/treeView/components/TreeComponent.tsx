import React, { useState, useEffect } from 'react';
import { TreeBar as S, TreeViewContainer } from '../treeView.style';
import { TreeItem, TreeComponentProps } from '../treeView.types';
import componentIcon from '../../../assets/Component.png';
import assetIcon from '../../../assets/Asset.png';
import locationIcon from '../../../assets/Location.png';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import { useCompany } from '../../shared/components/CompanyContext';
import { renderComponentIcons } from './RenderTreeIcon';

const TreeComponent: React.FC<TreeComponentProps> = ({ treeData, filter }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedNodes, setExpandedNodes] = useState<Set<string>>(new Set());
  const { setSelectedComponent } = useCompany();

  const initializeExpandedNodes = (nodes: TreeItem[], expanded: Set<string>) => {
    nodes.forEach(node => {
      if (node.children && node.children.length > 0) {
        expanded.add(node.id);
        initializeExpandedNodes(node.children, expanded);
      }
    });
  };

  useEffect(() => {
    const expanded = new Set<string>();
    initializeExpandedNodes(treeData, expanded);
    setExpandedNodes(expanded);
  }, [treeData]);

  const getIcon = (type: string) => {
    switch (type) {
      case 'location':
        return locationIcon;
      case 'asset':
        return assetIcon;
      case 'component':
        return componentIcon;
      default:
        return '';
    }
  };

  const toggleNode = (id: string) => {
    setExpandedNodes((prev) => {
      const newExpandedNodes = new Set(prev);
      if (newExpandedNodes.has(id)) {
        newExpandedNodes.delete(id);
      } else {
        newExpandedNodes.add(id);
      }
      return newExpandedNodes;
    });
  };

  const handleNodeClick = (node: TreeItem) => {
    if (node.type === 'component') {
      setSelectedComponent(node);
    }
  };

  const filterTree = (nodes: TreeItem[], filter: string, searchTerm: string): TreeItem[] => {
    const filteredNodes: TreeItem[] = [];
    nodes.forEach((node) => {
      const matchSearchTerm = node.name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchFilter = 
        (filter === 'Sensor de Energia' && node.sensorType === 'energy') ||
        (filter === 'Crítico' && node.status === 'alert') ||
        !filter;
        
      if (matchSearchTerm && matchFilter) {
        filteredNodes.push({
          ...node,
          children: node.children ? filterTree(node.children, filter, searchTerm) : [],
        });
      } else if (node.children && filterTree(node.children, filter, searchTerm).length > 0) {
        filteredNodes.push({
          ...node,
          children: filterTree(node.children, filter, searchTerm),
        });
      }
    });

    return filteredNodes;
  };

  const renderTree = (nodes: TreeItem[]) => {
    return nodes.map((node) => (
      <div key={node.id}>
        <S.TreeNode>
          <S.TreeNodeLabel onClick={() => {toggleNode(node.id); handleNodeClick(node);}}>
            {node.children && node.children.length > 0 && (
              expandedNodes.has(node.id) ? <KeyboardArrowDownIcon /> : <KeyboardArrowRightIcon />
            )}
            <S.TreeNodeIcon>
              <S.Icon src={getIcon(node.type)} alt={`${node.type} Icon`} />
            </S.TreeNodeIcon>
            {node.name}
            {node.type === 'component' && ( 
               <S.TreeNodeStatus>
                 {renderComponentIcons({ sensorType: node.sensorType, status: node.status })}
             </S.TreeNodeStatus>
            )}
          </S.TreeNodeLabel>
        </S.TreeNode>
        {node.children && node.children.length > 0 && expandedNodes.has(node.id) && (
          <S.Indent>{renderTree(node.children)}</S.Indent>
        )}
      </div>
    ));
  };

  const filteredTreeData = filterTree(treeData, filter, searchTerm);

  return (
    <S.Container>
      <S.InputSearchContainer>
        <S.InputSearch
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)} 
          placeholder="Buscar Ativo ou Local" 
        />
        <S.SearchIcon>
          <SearchOutlinedIcon style={{ display: 'flex' }} />
        </S.SearchIcon>
      </S.InputSearchContainer>
      <TreeViewContainer>
        {renderTree(filteredTreeData)}
      </TreeViewContainer>
    </S.Container>
  );
};

export default TreeComponent;
