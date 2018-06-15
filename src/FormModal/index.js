import React from "react";
import Modal from "../Modal";
import Form from "../Form";

class FormModal extends React.Component {
  constructor(props) {
    super(props);
    this.controller = null;
    this.setController = this.setController.bind(this);
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
      >
        <Form
          data={data}
          initialValues={initialValues}
          onSubmit={(values, { setError, resetForm, setSubmitting }) => {
            const reset = Object.keys(values)
              .reduce((result, prop) => {
                result[prop] = '';
                return result;
              }, {});
            this.props.onSubmit(values).then(() => {
              if (shouldReset) {
                resetForm(reset)
              }
              setSubmitting(false);
              this.controller.hide();
            }).catch((err) => {
              setError(JSON.stringify(err, null, 2));
              setSubmitting(false);
            });
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
