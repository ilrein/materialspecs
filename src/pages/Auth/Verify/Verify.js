import React, { Component } from 'react';
import {
  Form,
  Message,
  Header,
} from 'semantic-ui-react';
import styled from 'styled-components';
import { Auth } from 'aws-amplify';
import { withRouter, Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';

const Wrapper = styled.div`
  background-color: #eee;
  padding: 2rem;
  min-height: 100%;
`;

class Verify extends Component {
  state = {
    loading: false,
    email: '',
    verificationCode: '',
    errorMsg: null,
  }

  setValue = ({ name, value }) => this.setState(prevState => ({
    ...prevState,
    [name]: value,
  }));

  submit = () => {
    const { history } = this.props;
    const {
      email,
      verificationCode,
    } = this.state;

    this.setState(prevState => ({
      ...prevState,
      loading: true,
    }), () => {
      Auth.confirmSignUp(
        email,
        verificationCode,
      )
        .then(() => {
          toast.success(`Verified ${email}`);
          history.push('/');
        })
        .catch(({ message }) => {
          this.setState(prevState => ({
            ...prevState,
            loading: false,
            errorMsg: message,
          }));
        });
    });
  }

  render() {
    const {
      email,
      verificationCode,
      loading,
      errorMsg,
    } = this.state;

    return (
      <Wrapper>
        <Header as="h1">
          Thanks for signing up
        </Header>

        <p>
          A confirmation code has been sent to your email.
        </p>

        {
          errorMsg
            ? (
              <Message error>
                {errorMsg}
              </Message>
            )
            : null
        }

        <Form>
          <Form.Input
            label="Email"
            type="email"
            value={email}
            required
            name="email"
            onChange={(event, data) => this.setValue(data)}
            placeholder="hello@gmail.com"
          />

          <Form.Input
            label="Verification Code"
            type="text"
            value={verificationCode}
            required
            name="verificationCode"
            onChange={(event, data) => this.setValue(data)}
            placeholder="413231"
          />

          <Form.Button
            primary
            onClick={this.submit}
            loading={loading}
            style={{ marginBottom: '6rem' }}
          >
            Submit
          </Form.Button>

          <Form.Field>
            Already a member? Log in
            <Link to="/">
              &nbsp;here
            </Link>
          </Form.Field>
        </Form>
      </Wrapper>
    );
  }
}

Verify.propTypes = {
  history: PropTypes.shape().isRequired,
};

export default withRouter(Verify);
