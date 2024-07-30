import React, { ReactElement } from 'react';
import { Container, Content } from '../Home.style';
import Header from './Header';

const Home: React.FC<{
  children: ReactElement;
}> = ({ children }) => {
  return (
    <Container>
      <Header />
      <Content>
        {children}
      </Content>
    </Container>
  );
};

export default Home;
