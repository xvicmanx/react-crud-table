import React from 'react';
import { Container } from './wrappers';
import Button from '../Button';

const getDisplay = (visible) => {
  return visible ? 'block' : 'none';
};

class Modal extends React.Component {
  constructor(props) {
    super(props);
    this.showModal = this.showModal.bind(this);
    this.hideModal = this.hideModal.bind(this);
    this.state = { visible: false };
  }

  componentDidMount() {
    this.props.onInit({
      show: this.showModal,
      hide: this.hideModal
    });
  }

  showModal() {
    if (this.props.onDisplay) {
      this.props.onDisplay();
    }

    this.setState({ visible: true });
  }

  hideModal() {
    this.setState({ visible: false });
  }

  render() {
    const display = getDisplay(this.state.visible);
    return (
      <div>
        {this.props.trigger && (
          <Button
            modifiers="positive"
            onClick={this.showModal}
          >
            {this.props.trigger}
          </Button>
        )}
        <Container style={{ display }}>
          <Container.BG
            onClick={this.hideModal}
          />
          <Container.Modal>
            {this.props.title && (
              <Container.Title>
                {this.props.title}
              </Container.Title>
            )}
            {this.props.children}
          </Container.Modal>
        </Container>
      </div>
    );
  }
}

Modal.defaultProps = {
  onInit: () => {},
  onDisplay: () => {},
  title: '',
};

export default Modal;