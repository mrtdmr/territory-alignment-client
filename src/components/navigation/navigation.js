import React from 'react';
import { Menu, Container, Button } from 'semantic-ui-react';
import { NavLink } from 'react-router-dom';

const navigation = () => {
  return (
    <Menu fixed='top' inverted>
      <Container>
        <Menu.Item header as={NavLink} to='/dashboard' exact>
          <img
            src={`/assets/logo.png`}
            alt='Saha Validasyon'
            style={{ marginRight: '10px' }}
          />
          Anasayfa
        </Menu.Item>
        {/** 
          <Menu.Item name='departments' as={NavLink} to='/departments'>
          Uzmanlıklar
        </Menu.Item>
        <Menu.Item name='products' as={NavLink} to='/products'>
          Ürünler
        </Menu.Item>*/}
        <Menu.Item name='plans' as={NavLink} to='/plans'>
          Planlar
        </Menu.Item>
        <Menu.Item name='friends'>
          <Button as={NavLink} to='/create-plan' positive content='Plan Ekle' />
        </Menu.Item>
      </Container>
    </Menu>
  );
};

export default navigation;
