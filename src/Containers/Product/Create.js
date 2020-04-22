import React, { useEffect } from 'react';
import { Segment, Form as ProductForm } from 'semantic-ui-react';
import * as actions from '../../store/actions/index';
import { connect } from 'react-redux';
import { default as Loading } from '../../components/loading/loading';

const Form = (props) => {
  const { onGetProduct, onSetProductEmpty } = props;
  useEffect(() => {
    if (props.match.params.id) onGetProduct(props.match.params.id);
    else onSetProductEmpty();
  }, [onGetProduct, onSetProductEmpty, props.match.params.id]);
  let loading = props.loading ? (
    <Loading content='Lütfen bekleyiniz...' />
  ) : null;

  return (
    <Segment>
      {loading}
      <ProductForm>
        <ProductForm.Input placeholder='Ad' value={props.product.name} />
      </ProductForm>
    </Segment>
  );
};
const mapStateToProps = (state) => {
  return {
    product: state.product.product,
    loading: state.product.loading,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    onGetProduct: (id) => dispatch(actions.getProduct(id)),
    onSetProductEmpty: () => dispatch(actions.setProductEmpty()),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Form);
