import React, { useState } from 'react';
import styled from 'styled-components';
import {
  Header,
  Segment,
} from 'semantic-ui-react';
import fetch from 'isomorphic-fetch';
import { connect } from 'react-redux';
import { toast } from 'react-toastify';
// import { Link } from 'react-router-dom';

import {
  API_ITEMS,
  CAPTURE_ITEMS,
} from '../../constants';

import Dropzone from '../../components/Dropzone';

import ListItems from './ListItems';

const Wrapper = styled.div`
  padding: 2rem;
`;

const Items = ({ userReducer, captureItems, items }) => {
  const [doc, setDoc] = useState(null);
  const [uploading, setUploading] = useState(false);

  const getItemsAgain = async () => {
    try {
      const res = await fetch(API_ITEMS, {
        headers: {
          'Content-Type': 'application/json',
          'jwt-token': userReducer.cognitoUser.signInUserSession.accessToken.jwtToken,
        },
      });
      
      const items = await res.json();
      
      captureItems(items);
    } catch (error) {
      console.log(error); // eslint-disable-line
    }
  };

  const submitFile = async (file) => {
    const form = new FormData();

    form.append('pdf', file, file.name);

    try {
      setUploading(true);

      const post = await fetch(API_ITEMS, {
        method: 'POST',
        headers: {
          'jwt-token': userReducer.cognitoUser.signInUserSession.accessToken.jwtToken,
        },
        body: form,
      });

      const result = await post.json();

      toast.success(`Created ${result.product}`);
      setDoc(null);

      getItemsAgain();
    } catch (error) {
      console.log(error); // eslint-disable-line
    }

    setUploading(false);
  };

  return (
    <Wrapper
      className="fade-in"
    >
      <Header
        as="h1"
      >
        Items ({items.totalDocs})
      </Header>
      <div>
        {
          uploading
            ? (
              <>
                <Header>
                  Applying machine learning...
                </Header>
                <Segment
                  placeholder
                  loading
                >
                  Lorem Ipsum
                </Segment>
              </>
            )
            : null
        }

        {
          doc
            ? null
            : (
              <Dropzone 
                handleDrop={(file) => {
                  setDoc(file);
                  submitFile(file);
                }}
                defaultDropMessage="Upload your Material Spec Sheet by dropping or clicking"
              />
            )
        }
      </div>

      <ListItems />
    </Wrapper>
  );
};

const mapDispatchToProps = dispatch => ({
  captureItems: payload => dispatch({
    type: CAPTURE_ITEMS,
    payload,
  }),
});

export default connect(
  ({ userReducer, items }) => ({ userReducer, items }),
  mapDispatchToProps,
)(Items);
