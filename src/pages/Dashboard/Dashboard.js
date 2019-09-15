import React, { useState } from 'react';
import {
  Label,
  Icon,
  Button,
  Segment,
  Header,
  Form,
  Table,
} from 'semantic-ui-react';
import styled from 'styled-components';
import { connect } from 'react-redux';

const Wrapper = styled.div`
  padding: 2rem;
`;

// const mapOptions = options => 

const Dashboard = ({ userReducer, items }) => {
  const [name, setName] = useState('');
  const [materials, setMaterials] = useState(items.docs.map(option => ({
    key: option._id,
    value: {
      ...option,
      quantity: 1,
    },
    text: option.product,
  })));

  const [selectedMaterials, setSelectedMaterials] = useState([]);

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

        {
          items
          && items.docs
            ? (
              <Form.Dropdown
                label="Materials"
                multiple
                selection
                options={materials}
                value={selectedMaterials}
                onChange={(e, { value }) => {
                  console.log(value);
                  setSelectedMaterials(value);
                }}
              />
            )
            : null
        }

        {
          selectedMaterials.length > 0
            ? (
              <Segment>
                <Table
                  basic="very"
                  celled
                >
                  <Table.Header>
                    <Table.Row>
                      <Table.HeaderCell>
                        Product
                      </Table.HeaderCell>
                      <Table.HeaderCell>
                        Price
                      </Table.HeaderCell>
                      <Table.HeaderCell>
                        Quantity
                      </Table.HeaderCell>
                      <Table.HeaderCell>
                        Total
                      </Table.HeaderCell>
                    </Table.Row>
                  </Table.Header>

                  <Table.Body>
                    {
                      selectedMaterials.map(material => (
                        <Table.Row>
                          <Table.Cell>
                            {material.product}
                          </Table.Cell>
                          <Table.Cell>
                            {material.price}
                          </Table.Cell>
                          <Table.Cell
                            style={{
                              display: 'flex',
                              flexDirection: 'row',
                              alignItems: 'center',
                            }}
                          >
                            <Button
                              size="tiny"
                              disabled={material.quantity === 1}
                            >
                              <Icon name="minus" />
                            </Button>

                            <Label
                              color="blue"
                              size="large"
                            >
                              {material.quantity}
                            </Label>

                            <Button size="tiny">
                              <Icon name="plus" />
                            </Button>

                            {/* <Button.Group>
                              <Button>
                                <Icon name="plus" />
                              </Button>
                              <Button>
                                <Icon name="minus" />
                              </Button>
                            </Button.Group> */}
                          </Table.Cell>
                          <Table.Cell>
                            total
                          </Table.Cell>
                        </Table.Row>
                      ))
                    }
                  </Table.Body>
                </Table>
              </Segment>
            )
            : null
        }

        <Form.Button
          primary
        >
          Save
        </Form.Button>
      </Form>
    </Wrapper>
  );
};

export default connect(
  ({ userReducer, items }) => ({ userReducer, items }),
)(Dashboard);
