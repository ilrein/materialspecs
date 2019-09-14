import React, { useState } from 'react';
import {
  // Grid,
  // Statistic,
  // Button,
  // Message,
  Header,
  Form,
} from 'semantic-ui-react';
import styled from 'styled-components';

const Wrapper = styled.div`
  padding: 2rem;
`;

const Dashboard = () => {
  const [name, setName] = useState('');

  return (
    <Wrapper
      className="fade-in"
    >
      <Header
        as="h1"
      >
        Create a New Spec Sheet
      </Header>
  
      <Form>
        <Form.Input
          label="Project Name"
          onChange={(e, { value }) => setName(value)}
        />
        <Form.Button>
          Save
        </Form.Button>
      </Form>
    </Wrapper>
  );
};

export default Dashboard;
