export type Location = {
    name: string;
    id: string;
    parentId: string | null;
  };
  
  export type Asset = {
    name: string;
    id: string;
    locationId: string | null;
    parentId: string | null;
    sensorType: string | null;
    status: string | null;
  };
  
  export type TreeItem = {
    parentId?: string | null;
    id: string;
    name: string;
    locationId?: string | null,
    children?: TreeItem[];
    type: 'location' | 'asset' | 'component';
    sensorType?: string | null;
    status?: string | null;
  };
  
  export type TreeViewProps = {
    treeData: TreeItem[];
    filter: string;
  };
  
  export type TreeComponentProps = {
    treeData: TreeItem[];
    filter: string;
  };  