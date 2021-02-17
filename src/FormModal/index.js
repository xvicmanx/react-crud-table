// @flow

import * as React from 'react';

import Modal from '../Modal';
import Form from '../Form';
import { NO_OP } from '../helpers';
import { onSubmitHandler } from './helpers';
import { scrollToTop } from '../CRUDTable/helpers';

type Props = {
  visible: boolean,
  onVisibilityChange: Function,
  onSubmit: Function,
  shouldReset: boolean,
  trigger: number | string | null | React.Element<any> | Array<any>,
  data: Object,
  initialValues?: Object,
};

type State = {
  key: number,
};

class FormModal extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { key: 0 };
  }

  props: Props;

  render(): React$Element<any> {
    const {
      data,
      trigger,
      initialValues,
      shouldReset,
      onSubmit,
      visible,
      onVisibilityChange,
    } = this.props;
    const { key } = this.state;
    return (
      <Modal
        trigger={trigger}
        title={data.title}
        visible={visible}
        onShow={() => {
          scrollToTop();
          onVisibilityChange(true);
          this.setState({
            key: new Date().getTime(),
          });
        }}
        onHide={() => {
          onVisibilityChange(false);
        }}
      >
        <Form
          key={key}
          data={data}
          initialValues={initialValues}
          onSubmit={onSubmitHandler(onSubmit, shouldReset, () =>
            onVisibilityChange(false)
          )}
        />
      </Modal>
    );
  }
}

// $FlowFixMe
FormModal.defaultProps = {
  onVisibilityChange: NO_OP,
  onSubmit: NO_OP,
  shouldReset: false,
  trigger: null,
  initialValues: null,
  visible: false,
};

export default FormModal;
