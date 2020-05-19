import React from 'react';
import { Modal } from 'semantic-ui-react';
import * as actions from '../../store/actions/index';
import { connect } from 'react-redux';

const Container = (props) => {
  const { open, body } = props;
  return (
    <Modal open={open} closeIcon size='large'>
      <Modal.Content>{body}</Modal.Content>
    </Modal>
  );
};

const mapStateToProps = (state) => {
  return {
    open: state.modal.open,
    body: state.modal.body,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onCloseModal: () => dispatch(actions.closeModal()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Container);
