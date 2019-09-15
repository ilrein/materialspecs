import React, { useState, useEffect } from 'react';
import {
  Header,
  Segment,
  Table,
  Label,
} from 'semantic-ui-react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import fetch from 'isomorphic-fetch';
import dayjs from 'dayjs';

import { API_SHEETS } from '../../constants';

const Wrapper = styled.div`
  padding: 2rem;
`;

const Sheets = ({ userReducer }) => {
  const [loading, setLoading] = useState(false);
  const [sheets, setSheets] = useState({ docs: [] });

  const getSheets = async () => {
    setLoading(true);

    try {
      const get = await fetch(API_SHEETS, {
        headers: {
          'Content-Type': 'application/json',
          'jwt-token': userReducer.cognitoUser.signInUserSession.accessToken.jwtToken,
        },
      });

      const result = await get.json();
      // console.log(result);
      setSheets(result);
    } catch (error) {
      console.log(error); // eslint-disable-line
    }

    setLoading(false);
  };

  useEffect(() => {
    getSheets();
  }, []);

  console.log(sheets);

  return (
    <Wrapper
      className="fade-in"
    >
      <Segment
        basic
        loading={loading}
      >
        <Header
          as="h1"
        >
          Sheets
        </Header>
      </Segment>

      <Table celled striped stackable>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>
              Project
            </Table.HeaderCell>
            <Table.HeaderCell>
              Total Price
            </Table.HeaderCell>
            <Table.HeaderCell>
              Materials
            </Table.HeaderCell>
            <Table.HeaderCell>
              Created On
            </Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {
            sheets.docs.map(sheet => (
              <Table.Row>
                <Table.Cell>
                  {sheet.projectName}
                </Table.Cell>
                <Table.Cell>
                  {sheet.totalCost}
                </Table.Cell>
                <Table.Cell>
                  {sheet.materials.map(mat => (
                    <p>
                      <Label>
                        {mat.product}
                      </Label>
                      <Label>
                        Total {mat.quantity}
                      </Label>
                    </p>
                  ))}
                </Table.Cell>
                <Table.Cell>
                  <Label>
                    {dayjs(sheet.createdOn).format('ddd, MM/YY')}
                  </Label>
                </Table.Cell>
              </Table.Row>
            ))
          }
        </Table.Body>
      </Table>
    </Wrapper>
  );
};

export default connect(
  ({ userReducer }) => ({ userReducer }),
)(Sheets);
