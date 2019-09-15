import React from 'react';
import {
  Header,
} from 'semantic-ui-react';
import styled from 'styled-components';

const Wrapper = styled.div`
  padding: 2rem;
`;

const Sheets = () => (
  <Wrapper
    className="fade-in"
  >
    <Header
      as="h1"
    >
      Sheets
    </Header>
  </Wrapper>
);

export default Sheets;
