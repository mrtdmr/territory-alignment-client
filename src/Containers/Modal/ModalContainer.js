import React from 'react';
import { Modal, Button } from 'semantic-ui-react';
import * as actions from '../../store/actions/index';
import { connect } from 'react-redux';

const ModalContainer = (props) => {
  const { open, body, onCloseModal } = props;
  return (
    <Modal open={open} closeOnDimmerClick={false} size='mini'>
      <Modal.Content>{body}</Modal.Content>
      <Modal.Actions>
        <Button onClick={onCloseModal} negative>
          Cancel
        </Button>
      </Modal.Actions>
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

export default connect(mapStateToProps, mapDispatchToProps)(ModalContainer);
