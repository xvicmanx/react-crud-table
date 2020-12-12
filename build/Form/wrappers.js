"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.Form = void 0;

var _formik = require("formik");

var _bemReactComponentCreator = _interopRequireDefault(require("bem-react-component-creator"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _bcc = (0, _bemReactComponentCreator["default"])('crud-modal-form'),
    block = _bcc.block,
    element = _bcc.element;

var Form = block(_formik.Form);
exports.Form = Form;
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
var _default = {
  Form: Form
};
exports["default"] = _default;