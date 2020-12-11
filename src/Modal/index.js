import React from 'react';
import PropTypes from 'prop-types';
import { Container } from './wrappers';
import Button from '../Button';

const getDisplay = (visible) => (visible ? 'block' : 'none');

class Modal extends React.Component {
  constructor(props) {
    super(props);
    this.state = { visible: false };
    this.showModal = this.showModal.bind(this);
    this.hideModal = this.hideModal.bind(this);
  }

  componentDidMount() {
    const { onInit } = this.props;

    onInit({
      show: this.showModal,
      hide: this.hideModal,
    });
  }

  showModal() {
    const { onDisplay } = this.props;

    if (onDisplay) {
      onDisplay();
    }

    this.setState({ visible: true });
  }

  hideModal() {
    this.setState({ visible: false });
  }

  render() {
    const { children, trigger, title } = this.props;
    const { visible } = this.state;
    const style = {
      display: getDisplay(visible),
    };
    return (
      <div>
        {trigger && (
          <Button modifiers="positive" onClick={this.showModal}>
            {trigger}
          </Button>
        )}
        <Container style={style}>
          <Container.BG onClick={this.hideModal} />
          <Container.Modal>
            {title && <Container.Title>{title}</Container.Title>}
            {children}
          </Container.Modal>
        </Container>
      </div>
    );
  }
}

Modal.propTypes = {
  title: PropTypes.string,
  onInit: PropTypes.func,
  onDisplay: PropTypes.func,
  children: PropTypes.node,
  trigger: PropTypes.node,
};

Modal.defaultProps = {
  onInit: () => {},
  onDisplay: () => {},
  title: '',
  children: null,
  trigger: null,
};

export default Modal;
