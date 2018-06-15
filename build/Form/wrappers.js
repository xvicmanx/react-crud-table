'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Form = undefined;

var _formik = require('formik');

var _bemReactComponentCreator = require('bem-react-component-creator');

var _bemReactComponentCreator2 = _interopRequireDefault(_bemReactComponentCreator);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _bcc = (0, _bemReactComponentCreator2.default)('crud-modal-form'),
    block = _bcc.block,
    element = _bcc.element;

var Form = exports.Form = block(_formik.Form);

Form.Label = element('label', 'label');
Form.Message = element('div', 'message');
Form.ErrorMessage = element('div', 'error-message');
Form.FieldError = element('div', 'field-error');

exports.default = {
  Form: Form
};