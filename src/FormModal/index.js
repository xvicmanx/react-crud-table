import React from 'react';
import PropTypes from 'prop-types';
import Modal from '../Modal';
import Form from '../Form';
import { NO_OP } from '../helpers';

const isPromise = (target) =>
  Boolean(target && typeof target.then === 'function');

class FormModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = { key: 0 };
  }

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

FormModal.propTypes = {
  visible: PropTypes.bool,
  onVisibilityChange: PropTypes.func,
  onSubmit: PropTypes.func,
  shouldReset: PropTypes.bool,
  trigger: PropTypes.node,
  data: PropTypes.instanceOf(Object),
  initialValues: PropTypes.instanceOf(Object),
};

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
