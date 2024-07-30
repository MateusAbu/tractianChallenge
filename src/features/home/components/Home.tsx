import React, { ReactElement } from 'react';
import Navbar from './Navbar';
import { Container, Content } from '../Home.style';

const Home: React.FC<{
  children: ReactElement;
}> = ({ children }) => {
  return (
    <Container>
      <Navbar />
      <Content>
        {children}
      </Content>
    </Container>
  );
};

export default Home;
