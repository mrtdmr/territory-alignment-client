import React, { useEffect } from 'react';
import * as actions from '../../store/actions/index';
import { connect } from 'react-redux';
import Product from '../../components/product/product';
import { Table, Input, Button } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { default as Loading } from '../../components/loading/loading';
import Aux from '../../hoc/auxiliary/auxiliary';

const List = (props) => {
  const { onGetProducts } = props;
  useEffect(() => {
    onGetProducts();
  }, [onGetProducts]);
  let products = <Loading content='Lütfen bekleyiniz...' />;
  if (!props.loading && props.products) {
    products = (
      <Table striped>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Ürün Adı</Table.HeaderCell>
            <Table.HeaderCell>
              <Button
                as={Link}
                to={`/create-product`}
                floated='right'
                content='Ekle'
                color='green'
              />
            </Table.HeaderCell>
          </Table.Row>
          <Table.Row>
            <Table.HeaderCell>
              <Input placeholder='Filtrele' />
            </Table.HeaderCell>
            <Table.HeaderCell></Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {props.products.map((p) => (
            <Table.Row key={p.id}>
              <Table.Cell>
                <Product name={p.name} />
              </Table.Cell>
              <Table.Cell>
                <Button
                  as={Link}
                  to={`/products/${p.id}`}
                  floated='right'
                  content='Seç'
                  color='blue'
                />
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    );
  }

  return <Aux>{products}</Aux>;
};

const mapStateToProps = (state) => {
  return {
    products: state.product.products,
    loading: state.product.loading,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onGetProducts: () => dispatch(actions.getProducts()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(List);
