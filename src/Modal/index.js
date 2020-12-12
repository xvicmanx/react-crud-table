import React from 'react';
import PropTypes from 'prop-types';
import { Container } from './wrappers';
import Button from '../Button';
import { NO_OP } from '../helpers';

const getDisplay = (visible) => (visible ? 'block' : 'none');

const Modal = (props) => {
  const { children, trigger, title, visible, onHide, onShow } = props;
  const style = {
    display: getDisplay(visible),
  };
  return (
    <div>
      {trigger && (
        <Button modifiers="positive" onClick={onShow}>
          {trigger}
        </Button>
      )}
      <Container style={style}>
        <Container.BG onClick={onHide} />
        <Container.Modal>
          {title && <Container.Title>{title}</Container.Title>}
          {children}
        </Container.Modal>
      </Container>
    </div>
  );
};

Modal.propTypes = {
  title: PropTypes.string,
  onHide: PropTypes.func,
  onShow: PropTypes.func,
  children: PropTypes.node,
  trigger: PropTypes.node,
  visible: PropTypes.bool,
};

Modal.defaultProps = {
  onHide: NO_OP,
  onShow: NO_OP,
  title: '',
  children: null,
  trigger: null,
  visible: false,
};

export default Modal;
