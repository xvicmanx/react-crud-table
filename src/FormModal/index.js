import React from 'react';
import PropTypes from 'prop-types';
import Modal from '../Modal';
import Form from '../Form';

const isPromise = (target) =>
  Boolean(target && typeof target.then === 'function');

class FormModal extends React.Component {
  constructor(props) {
    super(props);
    this.controller = null;
    this.setController = this.setController.bind(this);
    this.state = { key: 0 };
  }

  setController(controller) {
    const { onInit } = this.props;
    this.controller = controller;
    onInit(controller);
  }

  render() {
    const { data, trigger, initialValues, shouldReset, onSubmit } = this.props;
    const { key } = this.state;
    return (
      <Modal
        trigger={trigger}
        onInit={this.setController}
        title={data.title}
        onDisplay={() => {
          this.setState({ key: new Date().getTime() });
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
                  this.controller.hide();
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
  onInit: PropTypes.func,
  onSubmit: PropTypes.func,
  shouldReset: PropTypes.bool,
  trigger: PropTypes.node,
  data: PropTypes.instanceOf(Object),
  initialValues: PropTypes.instanceOf(Object),
};

FormModal.defaultProps = {
  onInit: () => {},
  onSubmit: () => {},
  shouldReset: false,
  trigger: null,
  data: {},
  initialValues: null,
};

export default FormModal;
