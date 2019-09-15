import React, {
  useState,
  useEffect,
} from 'react';
import fetch from 'isomorphic-fetch';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import {
  API_SHEETS,
  CAPTURE_SHEETS,
} from '../../constants';
/**
 * checks to see if a User Object
 * is found in the database
 * based on the "sub" pulled in
 * from the AuthContainer
 */
const SheetsContainer = ({
  userReducer,
  captureSheets,
  children,
}) => {
  const [cognitoUser] = useState(userReducer.cognitoUser);
  const [loading, setLoading] = useState(false);

  /**
   * @function {}
   * looks for a user object on /api/users/
   * creates one if not found
   */
  const getSheets = async () => {
    setLoading(true);
    try {
      const res = await fetch(API_SHEETS, {
        headers: {
          'Content-Type': 'application/json',
          'jwt-token': cognitoUser.signInUserSession.accessToken.jwtToken,
        },
      });
      
      const sheets = await res.json();
      
      captureSheets(sheets);
    } catch (error) {
      console.log(error); // eslint-disable-line
    }
    setLoading(false);
  };

  useEffect(() => {
    getSheets();
  }, [cognitoUser]);

  return (
    <>
      {
        loading
          ? (
            <>
              loading...
            </>
          )
          : children
      }
    </>
  );
};

SheetsContainer.propTypes = {
  userReducer: PropTypes.shape().isRequired,
  captureSheets: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
};

const mapDispatchToProps = dispatch => ({
  captureSheets: payload => dispatch({
    type: CAPTURE_SHEETS,
    payload,
  }),
});

export default connect(({ userReducer }) => ({
  userReducer,
}), mapDispatchToProps)(SheetsContainer);
