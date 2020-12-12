import { Form as FormikForm } from 'formik';
import bcc from 'bem-react-component-creator';

const { block, element } = bcc('crud-modal-form');

export const Form = block(FormikForm);

Form.displayName = 'FormikForm';

Form.Label = element('label', 'label');
Form.Label.displayName = 'Label';

Form.Message = element('div', 'message');
Form.Message.displayName = 'Message';

Form.ErrorMessage = element('div', 'error-message');
Form.ErrorMessage.displayName = 'ErrorMessage';

Form.FieldError = element('div', 'field-error');
Form.FieldError.displayName = 'FieldError';

Form.FieldContainer = element('div', 'field-container');
Form.FieldContainer.displayName = 'FieldContainer';

export default {
  Form,
};
