// import React from 'react';
// import {
//   Container,
//   Header,
//   Button,
// } from 'semantic-ui-react';
// import styled from 'styled-components';
import { Link } from 'react-router-dom';

// const Wrapper = styled(Container)`
//   margin-top: 2rem;
// `;

// const Home = ({ history }) => (
//   <Wrapper
//     className="fade-in"
//   >
//     <Header as="h1">
//       Material Specs
//     </Header>

//     <Button.Group>
//       <Button
//         onClick={() => history.push('/login')}
//       >
//         Login
//       </Button>
//       <Button
//         onClick={() => history.push('/register')}
//       >
//         Register
//       </Button>
//     </Button.Group>
//   </Wrapper>
// );

// export default withRouter(Home);


import PropTypes from "prop-types";
import React, { Component } from "react";
import {
  Button,
  Card,
  Container,
  Grid,
  Header,
  Icon,
  Image,
  List,
  Menu,
  Responsive,
  Segment,
  Sidebar,
  Visibility,
} from "semantic-ui-react";

const src1 = require('../../images/1.png');
const src2 = require('../../images/2.jpg');
const src3 = require('../../images/3.png');
const src4 = require('../../images/4.jpg');
// Heads up!
// We using React Static to prerender our docs with server side rendering, this is a quite simple solution.
// For more advanced usage please check Responsive docs under the "Usage" section.
const getWidth = () => {
  const isSSR = typeof window === "undefined";

  return isSSR ? Responsive.onlyTablet.minWidth : window.innerWidth;
};

/* eslint-disable react/no-multi-comp */
/* Heads up! HomepageHeading uses inline styling, however it's not the best practice. Use CSS or styled components for
 * such things.
 */
const HomepageHeading = ({ mobile }) => (
  <div>
    <Container text>
      <Image
        style={{ "padding-top": 100 + "px" }}
        src={require("../../images/logowhite.png")}
        centered
      />

      <Header
        as="h2"
        content="Lightning Fast Material Cost Reporting"
        inverted
        style={{
          fontSize: mobile ? "1.5em" : "1.7em",
          fontWeight: "normal",
          marginTop: mobile ? "0.5em" : "1.5em"
        }}
      />
      <Menu.Item
        position="middle"
        inverted
        textAlign="center"
        style={{ minHeight: 200, padding: "1em 0em" }}
        vertical
      >
        <Link to="/register">
          <Button
            as="a"
          >
            Get Started
          </Button>
        </Link>
      </Menu.Item>
    </Container>
  </div>
);

class Home extends Component {
  state = {};

  hideFixedMenu = () => this.setState({ fixed: false });

  showFixedMenu = () => this.setState({ fixed: true });

  render() {
    const { children } = this.props;
    const { fixed } = this.state;

    return (
      <Responsive getWidth={getWidth} minWidth={Responsive.onlyTablet.minWidth}>
        <Visibility
          once={false}
          onBottomPassed={this.showFixedMenu}
          onBottomPassedReverse={this.hideFixedMenu}
        >
          <Segment
            inverted
            textAlign="center"
            style={{ minHeight: 700, padding: "1em 0em" }}
            vertical
            className="fade-in"
          >
            <Menu
              fixed={fixed ? "top" : null}
              inverted={!fixed}
              pointing={!fixed}
              secondary={!fixed}
              size="large"
            >
              <Container>
                <Menu.Item position="right">
                  <Link to="/login">
                    <Button
                      as="a"
                      inverted={!fixed}
                    >
                      Log in
                    </Button>
                  </Link>
                  <Link to="/register">
                    <Button
                      as="a"
                      inverted={!fixed}
                      primary={fixed}
                      style={{ marginLeft: "0.5em" }}
                    >
                      Sign Up
                    </Button>
                  </Link>
                </Menu.Item>
              </Container>
            </Menu>
            <HomepageHeading />
          </Segment>
        </Visibility>

        {children}
      </Responsive>
    );
  }
}

class MobileContainer extends Component {
  state = {};

  handleSidebarHide = () => this.setState({ sidebarOpened: false });

  handleToggle = () => this.setState({ sidebarOpened: true });

  render() {
    const { children } = this.props;
    const { sidebarOpened } = this.state;

    return (
      <Responsive
        as={Sidebar.Pushable}
        getWidth={getWidth}
        maxWidth={Responsive.onlyMobile.maxWidth}
      >
        <Sidebar
          as={Menu}
          animation="push"
          inverted
          onHide={this.handleSidebarHide}
          vertical
          visible={sidebarOpened}
        >
          <Menu.Item as="a" active>
            Home
          </Menu.Item>
          <Menu.Item as="a">Solutions</Menu.Item>
          <Menu.Item as="a">Support</Menu.Item>
          <Menu.Item as="a">Company</Menu.Item>
          <Menu.Item as="a">Contact</Menu.Item>
          <Menu.Item position="right">
            <Button as="a">Log in</Button>
            <Button as="a" style={{ marginLeft: "0.5em" }}>
              Sign Up
            </Button>
          </Menu.Item>
        </Sidebar>

        <Sidebar.Pusher dimmed={sidebarOpened}>
          <Segment
            inverted
            textAlign="center"
            style={{ minHeight: 350, padding: "1em 0em" }}
            vertical
          >
            <Container>
              <Menu inverted pointing secondary size="large">
                <Menu.Item onClick={this.handleToggle}>
                  <Icon name="sidebar" />
                </Menu.Item>
                <Menu.Item position="right">
                  <Button as="a" inverted>
                    Log in
                  </Button>
                  <Button as="a" inverted style={{ marginLeft: "0.5em" }}>
                    Sign Up
                  </Button>
                </Menu.Item>
              </Menu>
            </Container>
            <HomepageHeading mobile />
          </Segment>

          {children}
        </Sidebar.Pusher>
      </Responsive>
    );
  }
}

MobileContainer.propTypes = {
  children: PropTypes.node
};

const ResponsiveContainer = ({ children }) => (
  <div>
    <Home>{children}</Home>
    <MobileContainer>{children}</MobileContainer>
  </div>
);

ResponsiveContainer.propTypes = {
  children: PropTypes.node
};

const HomepageLayout = () => (
  <ResponsiveContainer>
    <Segment style={{ padding: '8em 0em' }} vertical>
      <Grid container stackable verticalAlign="middle">
        <Grid.Row>
          <Grid.Column width={6}>
            <Header as="h3" style={{ fontSize: '2em' }}>
              Making Material Management Easy
            </Header>
            <p style={{ fontSize: '1.33em' }}>
              One-stop-shop for building material management solutions for
              owners, general contractors, and manufacturers
            </p>
            <Header as="h3" style={{ fontSize: '2em' }}>
              AI Powered Solution
            </Header>
            <p style={{ fontSize: '1.33em' }}>
              Use machine learning to automatically process old PDFs
            </p>
          </Grid.Column>
          <Grid.Column floated="right" width={8}>
            <Image
              bordered
              rounded
              size="large"
              src={require("../../images/demo.png")}
              style={{ width: "auto", minHeight: "auto" }}
            />
          </Grid.Column>
        </Grid.Row>
        <Grid.Row></Grid.Row>
      </Grid>
    </Segment>
    <Segment inverted style={{ padding: '0em' }} vertical>
      <Grid celled="internally" columns="equal" stackable>
        <Grid.Row textAlign="center">
          <Grid.Column style={{ paddingBottom: "5em", paddingTop: "5em" }}>
            <Header inverted as="h3" style={{ fontSize: "2em" }}>
              Hours saved manually typing in data found in PDFs
            </Header>
          </Grid.Column>
          <Grid.Column style={{ paddingBottom: '5em', paddingTop: '5em' }}>
            <Header inverted as="h3" style={{ fontSize: '2em' }}>
              Report generation in minutes, not hours
            </Header>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Segment>

    <h2
      as="h2"
      style={{ fontSize: "2em", textAlign: "center", padding: "50px" }}
    >
      Meet The MaterialSpec Team
    </h2>
    <div
      style={{
        paddingBottom: "5em",
        margin: "auto",

        width: "1000px"
      }}
    >
      <Card.Group
        centered
        itemsPerRow={3}
        style={{ paddingBottom: "5em", textAlign: "center" }}
      >
        <Card>
          <Image src={require("../../images/il.jpg")} wrapped ui={false} />
          <Card.Content>
            <Card.Header>Ilia Reingold</Card.Header>
            <Card.Description>
              Lead Architect
            </Card.Description>
          </Card.Content>
        </Card>
        <Card>
          <Image src={require("../../images/jm.png")} wrapped ui={false} />
          <Card.Content>
            <Card.Header>Jamar Mitchell</Card.Header>
            <Card.Description>
              Fullstack Developer
            </Card.Description>
          </Card.Content>
        </Card>
        <Card>
          <Image src={require("../../images/cl.png")} wrapped ui={false} />
          <Card.Content>
            <Card.Header>Cornelia Li</Card.Header>
            <Card.Description>
              Business Analyst
            </Card.Description>
          </Card.Content>
        </Card>
        <Card>
          <Image src={require("../../images/vi2.png")} wrapped ui={false} />
          <Card.Content>
            <Card.Header>Victor Yip</Card.Header>
            <Card.Description>
              Fullstack Developer
            </Card.Description>
          </Card.Content>
        </Card>
        <Card>
          <Image src={require("../../images/am.png")} wrapped ui={false} />
          <Card.Content>
            <Card.Header>Meg D'Souza</Card.Header>
            <Card.Description>
              Business Analyst
            </Card.Description>
          </Card.Content>
        </Card>
        <Card>
          <Image src={require("../../images/meg.png")} wrapped ui={false} />
          <Card.Content>
            <Card.Header>Anika Marzia</Card.Header>
            <Card.Description>
              Business Analyst
            </Card.Description>
          </Card.Content>
        </Card>
      </Card.Group>
    </div>
    <Segment inverted style={{ padding: '8em 0em' }} vertical>
      <Container text>
        <Header inverted as="h3" style={{ fontSize: '2em' }}>
          Stop wasting time manually creating Spec PDFs
        </Header>
      </Container>
    </Segment>
    <Segment vertical style={{ padding: "5em 0em" }}>
      <Container>
        <Grid divided stackable>
          <Grid.Row>
            {/* <Grid.Column width={3}>
              <Header as="h4" content="About" />
              <List link>
                <List.Item as="a">Sitemap</List.Item>
                <List.Item as="a">Contact Us</List.Item>
                <List.Item as="a">Religious Ceremonies</List.Item>
                <List.Item as="a">Gazebo Plans</List.Item>
              </List>
            </Grid.Column>
            <Grid.Column width={3}>
              <Header as="h4" content="Services" />
              <List link>
                <List.Item as="a">Banana Pre-Order</List.Item>
                <List.Item as="a">DNA FAQ</List.Item>
                <List.Item as="a">How To Access</List.Item>
                <List.Item as="a">Favorite X-Men</List.Item>
              </List>
            </Grid.Column> */}
            <Grid.Column width={4}>
              <Header as="h4">Sponsors</Header>

              <Card.Group itemsPerRow={1}>
                <Card image={src1} />
              </Card.Group>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Container>
    </Segment>
  </ResponsiveContainer>
);

export default HomepageLayout;
