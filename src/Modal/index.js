// @flow

import * as React from 'react';
import { Container } from './wrappers';
import Button from '../Button';
import { NO_OP } from '../helpers';

const getDisplay = (visible) => (visible ? 'block' : 'none');

export type Props = {
  title?: string,
  onHide?: Function,
  onShow?: Function,
  children?: number | string | React.Element<any> | Array<any>,
  trigger?: number | string | React.Element<any> | Array<any>,
  visible?: boolean,
};

const Modal = (props: Props): React$Element<any> => {
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

Modal.defaultProps = {
  onHide: NO_OP,
  onShow: NO_OP,
  title: '',
  children: null,
  trigger: null,
  visible: false,
};

export default Modal;
