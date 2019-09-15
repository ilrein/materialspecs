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
import formatUSD from 'format-usd';
import fetch from 'isomorphic-fetch';
import { toast } from 'react-toastify';
import { withRouter } from 'react-router-dom';

import { API_SHEETS } from '../../constants';

const R = require('ramda');

const Wrapper = styled.div`
  padding: 2rem;
`;

// const mapOptions = options => 

const Dashboard = ({ userReducer, items, history }) => {
  const [name, setName] = useState('');
  const [materials, setMaterials] = useState(items.docs.map(option => ({
    key: option._id,
    value: option,
    text: option.product,
  })));

  const [selectedMaterials, setSelectedMaterials] = useState([]);

  const [materialQuantity, setMaterialQuantity] = useState([]);
  
  const totalPrice = () => {
    const prices = materialQuantity.map(mat => mat.price * mat.quantity);

    return formatUSD({ amount: R.sum(prices) });
  };

  const [saving, setSaving] = useState(false);

  const saveSheet = async () => {
    const totalCost = totalPrice();

    const params = {
      sheet: {
        projectName: name,
        materials: materialQuantity,
        totalCost,
      },
    };

    setSaving(true);

    try {
      const post = await fetch(API_SHEETS, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'jwt-token': userReducer.cognitoUser.signInUserSession.accessToken.jwtToken,
        },
        body: JSON.stringify(params),
      });

      await post.json();

      toast.success('Created new spec sheet!');

      history.push('/sheets');
    } catch (error) {
      console.log(error); // eslint-disable-line
    }

    setSaving(false);
  };

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
                  setSelectedMaterials(value);
                  value.map((item) => {
                    setMaterialQuantity(
                      [
                        ...materialQuantity,
                        {
                          ...item,
                          quantity: 1,
                          price: Number(item.price.split('$')[1]),
                        },
                      ],
                    );
                  });
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
                      selectedMaterials.map((material, index) => (
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
                              onClick={() => {
                                const oldValueIndex = R.findIndex(R.propEq('_id', material._id))(materialQuantity);
                                const oldValue = R.find(R.propEq('_id', material._id))(materialQuantity);
                                const newValue = {
                                  ...oldValue,
                                  quantity: oldValue.quantity -= 1,
                                };

                                // console.log(newValue);
                                const updated = R.update(
                                  oldValueIndex,
                                  newValue,
                                  materialQuantity,
                                );

                                setMaterialQuantity(updated);
                              }}
                            >
                              <Icon name="minus" />
                            </Button>

                            <Label
                              color="blue"
                              size="large"
                            >
                              {
                                R.find(R.propEq('_id', material._id))(materialQuantity).quantity
                              }
                            </Label>

                            <Button
                              size="tiny"
                              onClick={() => {
                                const oldValueIndex = R.findIndex(R.propEq('_id', material._id))(materialQuantity);
                                const oldValue = R.find(R.propEq('_id', material._id))(materialQuantity);
                                const newValue = {
                                  ...oldValue,
                                  quantity: oldValue.quantity += 1,
                                };

                                // console.log(newValue);
                                const updated = R.update(
                                  oldValueIndex,
                                  newValue,
                                  materialQuantity,
                                );

                                setMaterialQuantity(updated);
                              }}
                            >
                              <Icon name="plus" />
                            </Button>
                          </Table.Cell>
                          <Table.Cell>
                            {formatUSD({
                              amount:
                                R.find(R.propEq('_id', material._id))(materialQuantity).quantity
                                * R.find(R.propEq('_id', material._id))(materialQuantity).price,
                            })}
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

        <Segment>
          Total Price: {totalPrice()}
        </Segment>

        <Form.Button
          primary
          loading={saving}
          onClick={saveSheet}
        >
          Save
        </Form.Button>
      </Form>
    </Wrapper>
  );
};

export default connect(
  ({ userReducer, items }) => ({ userReducer, items }),
)(withRouter(Dashboard));
