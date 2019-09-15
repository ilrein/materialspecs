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
  Divider,
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
        src={require("../../images/logogreen.png")}
        centered
      />

      <Header
        as="h2"
        content="Enabling unparalleled transparency through a centralized data source"
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
    <Segment style={{ padding: "8em 0em" }} vertical>
      <Grid container stackable verticalAlign="middle">
        <Grid.Row>
          <Grid.Column width={6}>
            <Header as="h3" style={{ fontSize: "2em" }}>
              Making Material Management Easy
            </Header>
            <p style={{ fontSize: "1.33em" }}>
              One-stop-shop for building material management solutions for
              owners, general contractors, and manufactures
            </p>
            <Header as="h3" style={{ fontSize: "2em" }}>
              We Make Bananas That Can Dance
            </Header>
            <p style={{ fontSize: "1.33em" }}>
              Yes that's right, you thought it was the stuff of dreams, but even
              bananas can be bioengineered.
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
    <Segment inverted style={{ padding: "0em" }} vertical>
      <Grid celled="internally" columns="equal" stackable>
        <Grid.Row textAlign="center">
          <Grid.Column style={{ paddingBottom: "5em", paddingTop: "5em" }}>
            <Header inverted as="h3" style={{ fontSize: "2em" }}>
              "So much time saved!"
            </Header>
            <p style={{ fontSize: "1.33em" }}>
              That is what they all say about us
            </p>
          </Grid.Column>
          <Grid.Column style={{ paddingBottom: "5em", paddingTop: "5em" }}>
            <Header inverted as="h3" style={{ fontSize: "2em" }}>
              "I shouldn't have gone with their competitor."
            </Header>
            <p style={{ fontSize: "1.33em" }}>
              <Image avatar src={require("../../images/cl.png")} />
              <b>Nan</b> Chief Fun Officer Architect Corp
            </p>
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
        itemsPerRow={4}
        style={{ paddingBottom: "5em", textAlign: "center" }}
      >
        <Card>
          <Image src={require("../../images/jm.png")} wrapped ui={false} />
          <Card.Content>
            <Card.Header>Jamar Mitchell</Card.Header>
            <Card.Description>
              Jamar is a comedian living in Nashville.
            </Card.Description>
          </Card.Content>
        </Card>
        <Card>
          <Image src={require("../../images/cl.png")} wrapped ui={false} />
          <Card.Content>
            <Card.Header>Cornelia Li</Card.Header>
            <Card.Description>
              Jamar is a comedian living in Nashville.
            </Card.Description>
          </Card.Content>
        </Card>
        <Card>
          <Image src={require("../../images/il.jpg")} wrapped ui={false} />
          <Card.Content>
            <Card.Header>Jamar Mitchell</Card.Header>
            <Card.Description>
              Jamar is a comedian living in Nashville.
            </Card.Description>
          </Card.Content>
        </Card>
        <Card>
          <Image src={require("../../images/vi2.png")} wrapped ui={false} />
          <Card.Content>
            <Card.Header>Victor</Card.Header>
            <Card.Description>
              Jamar is a comedian living in Nashville.
            </Card.Description>
          </Card.Content>
        </Card>
        <Card>
          <Image src={require("../../images/am.png")} wrapped ui={false} />
          <Card.Content>
            <Card.Header>Anika</Card.Header>
            <Card.Description>
              Jamar is a comedian living in Nashville.
            </Card.Description>
          </Card.Content>
        </Card>
        <Card>
          <Image src={require("../../images/meg.png")} wrapped ui={false} />
          <Card.Content>
            <Card.Header>Meg</Card.Header>
            <Card.Description>
              Jamar is a comedian living in Nashville.
            </Card.Description>
          </Card.Content>
        </Card>
      </Card.Group>
    </div>
    <Segment inverted style={{ padding: "8em 0em" }} vertical>
      <Container text>
        <Header inverted as="h3" style={{ fontSize: "2em" }}>
          Breaking The Grid, Grabs Your Attention
        </Header>
        <p style={{ fontSize: "1.33em" }}>
          Instead of focusing on content creation and hard work, we have learned
          how to master the art of doing nothing by providing massive amounts of
          whitespace and generic content that can seem massive, monolithic and
          worth your attention.
        </p>
        <Button as="a" size="large">
          Learn More
        </Button>
      </Container>
    </Segment>
    <Segment vertical style={{ padding: "5em 0em" }}>
      <Container>
        <Grid divided stackable>
          <Grid.Row>
            <Grid.Column width={3}>
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
            </Grid.Column>
            <Grid.Column width={10}>
              <Header as="h4">Sponsers</Header>

              <Card.Group itemsPerRow={6}>
                <Card raised image={src1} />
                <Card raised image={src2} />
                <Card raised image={src3} />
                <Card raised image={src4} />
              </Card.Group>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Container>
    </Segment>
  </ResponsiveContainer>
);

export default HomepageLayout;
