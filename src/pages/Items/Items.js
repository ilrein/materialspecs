import React, { useState } from 'react';
import styled from 'styled-components';
import {
  Header,
  Segment,
} from 'semantic-ui-react';
import fetch from 'isomorphic-fetch';
import { connect } from 'react-redux';

import { API_ITEMS } from '../../constants';

import Dropzone from '../../components/Dropzone';

const Wrapper = styled.div`
  padding: 2rem;
`;

const Items = ({ userReducer }) => {
  const [doc, setDoc] = useState(null);
  const [uploading, setUploading] = useState(false);

  const submitFile = async (file) => {
    const form = new FormData();
    console.log(file);
    form.append('pdf', file, file.name);

    try {
      const post = await fetch(API_ITEMS, {
        method: 'POST',
        headers: {
          // 'Content-Type': 'multipart/form-data',
          // 'Content-Type': 'application/json',
          'jwt-token': userReducer.cognitoUser.signInUserSession.accessToken.jwtToken,
        },
        body: form,
      });

      const result = await post.json();

      console.log(result);
    } catch (error) {
      console.log(error); // eslint-disable-line
    }
  };

  return (
    <Wrapper
      className="fade-in"
    >
      <Header
        as="h1"
      >
        Items
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
                defaultDropMessage="Upload your Spec Sheet by dropping or clicking"
              />
            )
        }
      </div>
    </Wrapper>
  );
};

export default connect(
  ({ userReducer }) => ({ userReducer }),
)(Items);
