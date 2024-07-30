import React from 'react';
import { InfoCard as S } from '../treeView.style';
import { useCompany } from '../../shared/components/CompanyContext';
import { renderComponentIcons } from './RenderTreeIcon';
import ImageUploader from '../../shared/components/ImageUpload';
import RouterIcon from '@mui/icons-material/Router';
import WifiTetheringIcon from '@mui/icons-material/WifiTethering';
import CircleIconText from '../../shared/components/CircleIconText';

const InfoComponent: React.FC = () => {
  const { selectedComponent } = useCompany();

  const equipmentName = selectedComponent?.name.split(' - ')[0];
  const sensorTypeFormatted = selectedComponent?.sensorType === 'energy' ? 'energia' :
    selectedComponent?.sensorType === 'vibration' ? 'vibração' : null;
  const statusFormatted = selectedComponent?.status === 'alert' ? 'Alerta' :
    selectedComponent?.status === 'operating' ? 'Operando' : null;

  const getSensorName = (id: string): string => {
    return id.substring(0, 7).toUpperCase();
  };
  
  const getReceptorName = (id: string): string => {
    return id.substring(id.length - 7).toUpperCase();
  };

  return (
    <S.Container>
      {selectedComponent ? (
        <>
        <S.Header>
        <S.Title>
          {selectedComponent.name}
          {selectedComponent && renderComponentIcons({ sensorType: selectedComponent.sensorType, status: selectedComponent.status })}
        </S.Title>
      </S.Header>
      <S.Body>
        <S.Sections>
          <ImageUploader />
          <div style={{ marginLeft: '1.5rem', display: 'flex', flexDirection: 'column', flexGrow: 1, justifyContent: 'space-evenly' }}>
            <div>
              <S.SubTitle>Tipo de Equipamento</S.SubTitle>
              <S.Text>{`${equipmentName} de ${sensorTypeFormatted}`}</S.Text>
            </div>
            <hr style={{ width: '100%', backgroundColor: '#77818C' }}/>
            <div>
            <S.SubTitle>Responsáveis</S.SubTitle>
              <CircleIconText text={selectedComponent?.sensorType === 'energy' ? 'Elétrica' : 'Mecânica'} />
            </div>
          </div>
        </S.Sections>

        <hr style={{ width: '100%', backgroundColor: '#77818C' }}/>

        <S.Sections style={{ display: 'flex', justifyContent: 'space-around' }}>
          <div>
            <S.SubTitle>Sensor</S.SubTitle>
            <S.TextContainer>
                <WifiTetheringIcon style={{ color: '#55a6ff' }} />
                <S.Text>
                  {getSensorName(selectedComponent.id)}
                </S.Text>
            </S.TextContainer>
          </div>
          <div>
            <S.SubTitle>Receptor</S.SubTitle>
            <S.TextContainer>
              <RouterIcon style={{ color: '#55a6ff' }} />
              <S.Text>
                {getReceptorName(selectedComponent.id)}
              </S.Text>
            </S.TextContainer>
          </div>
          <div>
            <S.SubTitle>Status</S.SubTitle>
            <S.TextContainer>
              {renderComponentIcons({ status: selectedComponent.status })}
              <S.Text>
                {statusFormatted}
              </S.Text>
            </S.TextContainer>
          </div>
        </S.Sections>
      </S.Body>
        </>
      ) : (
        <>
          <S.Header>
            <S.Title>
              Selecione um componente
            </S.Title>
          </S.Header>
          <S.Body></S.Body>
        </>
      )}
    </S.Container>
  );
}

export default InfoComponent;
