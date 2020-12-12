// @flow
import React from 'react';
import Modal from '../Modal';
import Form from '../Form';
import { NO_OP } from '../helpers';

const isPromise = (target) =>
  Boolean(target && typeof target.then === 'function');

type Props = {
  visible?: boolean,
  onVisibilityChange?: Function,
  onSubmit?: Function,
  shouldReset?: boolean,
  trigger?: number | string | React.Element | Array<any>,
  data?: Object,
  initialValues?: Object,
};

class FormModal extends React.Component {
  constructor(props: Props) {
    super(props);
    this.state = { key: 0 };
  }

  props: Props;

  render() {
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
          onSubmit={(values, { setError, resetForm, setSubmitting }) => {
            const reset = Object.keys(values).reduce(
              (result, prop) => ({
                ...result,
                [prop]: '',
              }),
              {}
            );

            const result = onSubmit(values);

            if (isPromise(result)) {
              result
                .then(() => {
                  if (shouldReset) {
                    resetForm(reset);
                  }

                  setSubmitting(false);
                  onVisibilityChange(false);
                })
                .catch((err) => {
                  setError(err ? err.message : 'Unexpected error');
                  setSubmitting(false);
                });
            }
          }}
        />
      </Modal>
    );
  }
}

FormModal.defaultProps = {
  onVisibilityChange: NO_OP,
  onSubmit: NO_OP,
  shouldReset: false,
  trigger: null,
  data: {},
  initialValues: null,
  visible: false,
};

export default FormModal;
