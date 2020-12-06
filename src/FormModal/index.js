import React from "react";
import Modal from "../Modal";
import Form from "../Form";

const isPromise = (target) => Boolean(target && typeof target.then === 'function');

class FormModal extends React.Component {
  constructor(props) {
    super(props);
    this.controller = null;
    this.setController = this.setController.bind(this);
    this.state = { key: 0 };
  }

  setController(controller) {
    this.controller = controller;
    this.props.onInit(controller);
  }

  render() {
    const {
      data,
      trigger,
      initialValues,
      shouldReset,
    } = this.props;
    return (
      <Modal
        trigger={trigger}
        onInit={this.setController}
        title={data.title}
        onDisplay={() => {
          this.setState({ key: (new Date()).getTime()})
        }}
      >
        <Form
          key={this.state.key}
          data={data}
          initialValues={initialValues}
          onSubmit={(values, { setError, resetForm, setSubmitting }) => {
            const reset = Object.keys(values)
              .reduce((result, prop) => {
                result[prop] = '';
                return result;
              }, {});

            const result = this.props.onSubmit(values)
            
            if (isPromise(result)) {
              result.then(() => {
                if (shouldReset) {
                  resetForm(reset);
                }
  
                setSubmitting(false);
                this.controller.hide();
              }).catch((err) => {
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
  onInit: () => {},
  shouldReset: false,
};

export default FormModal;
