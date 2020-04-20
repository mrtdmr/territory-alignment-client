import React from 'react';
import { Segment, Container, Header, Image, Button } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import Aux from '../../hoc/auxiliary/auxiliary';

const Home = () => {
  const homePage = (
    <Aux>
      <Header as='h2' inverted content={`Hoş geldiniz...`} />
      <Button as={Link} to='/dashboard' size='huge' inverted>
        Saha Validasyon v1.0
      </Button>
    </Aux>
  );
  return (
    <Segment inverted textAlign='center' vertical className='masthead'>
      <Container text>
        <Header as='h1' inverted>
          <Image
            src='/assets/logo.png'
            alt='logo'
            style={{ marginBottom: 12 }}
          />
        </Header>
        {homePage}
      </Container>
    </Segment>
  );
};

export default Home;
