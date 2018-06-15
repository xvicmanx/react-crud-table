import { Field, Form as FormikForm } from "formik";
import bcc from 'bem-react-component-creator';

const { block, element } = bcc('crud-modal-form');

export const Form = block(FormikForm);

Form.Label = element('label', 'label');
Form.Message = element('div', 'message');
Form.ErrorMessage = element('div', 'error-message');
Form.FieldError = element('div', 'field-error');

export default {
  Form
};
