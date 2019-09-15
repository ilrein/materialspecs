import React, {
  useState,
  useEffect,
} from 'react';
import fetch from 'isomorphic-fetch';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import {
  API_ITEMS,
  CAPTURE_ITEMS,
} from '../../constants';
/**
 * checks to see if a User Object
 * is found in the database
 * based on the "sub" pulled in
 * from the AuthContainer
 */
const ItemsContainer = ({
  userReducer,
  captureItems,
  children,
}) => {
  const [cognitoUser] = useState(userReducer.cognitoUser);
  const [loading, setLoading] = useState(false);

  /**
   * @function {}
   * looks for a user object on /api/users/
   * creates one if not found
   */
  const getItems = async () => {
    setLoading(true);
    try {
      const res = await fetch(API_ITEMS, {
        headers: {
          'Content-Type': 'application/json',
          'jwt-token': cognitoUser.signInUserSession.accessToken.jwtToken,
        },
      });
      
      const items = await res.json();
      
      captureItems(items);
    } catch (error) {
      console.log(error); // eslint-disable-line
    }
    setLoading(false);
  };

  useEffect(() => {
    getItems();
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

ItemsContainer.propTypes = {
  userReducer: PropTypes.shape().isRequired,
  captureItems: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
};

const mapDispatchToProps = dispatch => ({
  captureItems: payload => dispatch({
    type: CAPTURE_ITEMS,
    payload,
  }),
});

export default connect(({ userReducer }) => ({
  userReducer,
}), mapDispatchToProps)(ItemsContainer);
