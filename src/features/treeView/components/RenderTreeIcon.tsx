import React from 'react';
import BoltIcon from '@mui/icons-material/Bolt';
import { OperatingIcon } from '../treeView.style';

type RenderComponentIconsProps = {
  sensorType?: string | null;
  status?: string | null;
};

export const renderComponentIcons: React.FC<RenderComponentIconsProps> = ({ sensorType, status }) => {
  return (
    <>
      {sensorType === 'energy' && <BoltIcon style={{ color: '#52C41A' }} />}
      {status === 'alert' && <OperatingIcon style={{ backgroundColor: 'red' }} />}
      {status === 'operating' && <OperatingIcon style={{ backgroundColor: '#52C41A' }} />}
    </>
  );
};
