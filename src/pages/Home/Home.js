import React from 'react';
import {
  Container,
  Header,
  Button,
} from 'semantic-ui-react';
import styled from 'styled-components';
import { withRouter } from 'react-router-dom';

const Wrapper = styled(Container)`
  margin-top: 2rem;
`;

const Home = ({ history }) => (
  <Wrapper
    className="fade-in"
  >
    <Header as="h1">
      Material Specs
    </Header>

    <Button.Group>
      <Button
        onClick={() => history.push('/login')}
      >
        Login
      </Button>
      <Button
        onClick={() => history.push('/register')}
      >
        Register
      </Button>
    </Button.Group>
  </Wrapper>
);

export default withRouter(Home);
