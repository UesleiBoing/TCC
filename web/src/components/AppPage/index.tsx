import React from 'react';

import NavBar from 'components/NavBar';

import { Container } from './styles';

interface IProps {
  children: JSX.Element;
}

const AppPage: React.FC<IProps> = ({ children }) => (
  <Container>
    <NavBar>
      { children }
    </NavBar>
  </Container>
);

export default AppPage;
