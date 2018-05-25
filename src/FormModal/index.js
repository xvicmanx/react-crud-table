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
          onSubmit={values => {
            this.props.onSubmit(values);
            this.controller.hide();
          }}
        />
      </Modal>
    );
  }
}

FormModal.defaultProps = {
  onInit: () => {},
};

export default FormModal;
