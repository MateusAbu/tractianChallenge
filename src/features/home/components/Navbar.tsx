import React, { useState } from 'react';
import { Navbar as S } from '../Home.style';
import logo from '../../../assets/LOGO TRACTIAN.png';
import { useCompany } from '../../shared/components/CompanyContext';

const Navbar: React.FC = () => {
  const { selectedCompany, setSelectedCompany } = useCompany();
  const [selectedUnit, setSelectedUnit] = useState(selectedCompany);

  const handleCompanyChange = (company: string) => {
    setSelectedUnit(company);
    setSelectedCompany(company);
  };

  return (
    <S.Container>
      <S.Logo src={logo} alt="Tractian Logo"/>
      <S.Menu
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        {['Apex Unit', 'Tobias Unit', 'Jaguar Unit'].map((unit) => (
          <S.MenuButton
            key={unit}
            $selected={selectedUnit === unit}
            onClick={() =>  handleCompanyChange(unit)}
          >
            {unit}
          </S.MenuButton>
        ))}
      </S.Menu>
    </S.Container>
  );
};

export default Navbar;
