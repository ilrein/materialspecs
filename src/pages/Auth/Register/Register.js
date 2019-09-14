import React, { Component } from 'react';
import {
  Form,
  Segment,
  Message,
  List,
  Header,
} from 'semantic-ui-react';
import styled from 'styled-components';
import { Auth } from 'aws-amplify';
import { withRouter, Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';

// utils
import {
  passwordStrength1,
  passwordStrength2,
} from './copy.json';

const Wrapper = styled.div`
  margin: 0 !important;
  padding: 2rem;
  min-height: 100%;
  background-color: #eee;
`;

class Register extends Component {
  state = {
    // UI phases
    loading: false,

    // fields
    email: '',
    password: '',
    passwordConfirmation: '',

    // errors
    emailTooShort: false,
    passwordTooShort: false,
    passwordsDontMatch: false,
    cognitoErrorMessage: null,
  }
  /**
   * sets a state value dynamically
   */

  setValue = ({ name, value }) => this.setState(prevState => ({
    ...prevState,
    [name]: value,
  }));

  handleSubmit = () => {
    const { history } = this.props;
    const {
      email,
      password,
      passwordConfirmation,
    } = this.state;
    /**
     * form validations
     */
    if (email.length < 1) {
      this.setState(prevState => ({
        ...prevState,
        emailTooShort: true,
      }));
      return;
    }

    if (password.length < 7) {
      this.setState(prevState => ({
        ...prevState,
        passwordTooShort: true,
      }));
      return;
    }
    /**
     * Check if passwords match
     */
    if (password !== passwordConfirmation) {
      this.setState(prevState => ({
        ...prevState,
        passwordsDontMatch: true,
      }));
      return;
    }

    this.setState(prevState => ({
      ...prevState,
      emailTooShort: false,
      passwordTooShort: false,
      passwordsDontMatch: false,
      loading: true,
    }), () => {
      Auth.signUp({
        username: email,
        password,
        attributes: {
          email,
        },
      })
        .then(() => {
          toast.success(`Successfully created ${email}`);
          history.push('/verify');
        })
        .catch(({
          message,
        }) => this.setState(prevState => ({
          ...prevState,
          loading: false,
          cognitoErrorMessage: message,
        })));
    });
  }

  render() {
    const {
      loading,

      // fields
      email,
      password,
      passwordConfirmation,

      // errors
      emailTooShort,
      passwordTooShort,
      passwordsDontMatch,
      cognitoErrorMessage,
    } = this.state;

    return (
      <Wrapper
        className="fade-in"
      >
        <Header as="h1">
          Register
        </Header>
        <Message>
          <Message.Header>
            Passwords must:
          </Message.Header>
          <List as="ul">
            <List.Item as="li">
              {passwordStrength1}
            </List.Item>
            <List.Item as="li">
              {passwordStrength2}
            </List.Item>
          </List>
        </Message>

        <Segment
          basic
          style={{ padding: 0 }}
        >
          {
            cognitoErrorMessage
              ? (
                <Message error>
                  {cognitoErrorMessage}
                </Message>
              )
              : null
          }
          <Form>
            <Form.Input
              label="Email"
              type="email"
              name="email"
              value={email}
              onChange={(event, data) => this.setValue(data)}
              error={emailTooShort}
              required
            />

            <Form.Input
              label="Password"
              type="password"
              name="password"
              value={password}
              onChange={(event, data) => this.setValue(data)}
              error={passwordTooShort}
              required
            />

            <Form.Input
              label="Password confirmation"
              type="password"
              name="passwordConfirmation"
              value={passwordConfirmation}
              onChange={(event, data) => this.setValue(data)}
              error={passwordsDontMatch}
              required
            />

            <Form.Button
              onClick={this.handleSubmit}
              loading={loading}
              style={{ marginBottom: '6rem' }}
            >
              Submit
            </Form.Button>

            <Form.Field>
              Already a member? Log in
              <Link to="/login">
                &nbsp;here
              </Link>
            </Form.Field>
          </Form>
        </Segment>
      </Wrapper>
    );
  }
}

Register.propTypes = {
  history: PropTypes.shape().isRequired,
};

export default withRouter(Register);
