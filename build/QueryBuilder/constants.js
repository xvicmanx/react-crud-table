"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.DEFAULT_STATE = exports.CONDITIONS = exports.CONDITIONS_LABEL = void 0;
var CONDITIONS_LABEL = {
  EQUALS_TO: 'Equals to',
  BEGINS_WITH: 'Begins with',
  ENDS_WITH: 'Ends with',
  CONTAINS: 'Contains',
  LESS_THAN: 'Less than',
  GREATER_THAN: 'Greater than',
  LESS_OR_EQUALS_THAN: 'Less or equals than',
  GREATER_OR_EQUALS_THAN: 'Greater or equals than',
  IS: 'Is',
  IS_NOT: 'Is not',
  IS_NOT_EQUALS_TO: 'Is not equals to',
  DOES_NOT_BEGIN_WITH: ' Does not begin with',
  DOES_NOT_END_WITH: ' Does not end with',
  DOES_NOT_CONTAIN: ' Does not contain',
  IS_NOT_LESS_THAN: 'Is not less than',
  IS_NOT_GREATER_THAN: 'Is not greater than',
  IS_NOT_LESS_OR_EQUALS_THAN: 'Is not less or equals than',
  IS_NOT_GREATER_OR_EQUALS_THAN: 'Is not greater or equals than'
};
exports.CONDITIONS_LABEL = CONDITIONS_LABEL;
var CONDITIONS = {
  EQUALS_TO: 'EQUALS_TO',
  BEGINS_WITH: 'BEGINS_WITH',
  ENDS_WITH: 'ENDS_WITH',
  CONTAINS: 'CONTAINS',
  LESS_THAN: 'LESS_THAN',
  GREATER_THAN: 'GREATER_THAN',
  LESS_OR_EQUALS_THAN: 'LESS_OR_EQUALS_THAN',
  GREATER_OR_EQUALS_THAN: 'GREATER_OR_EQUALS_THAN',
  IS: 'IS',
  IS_NOT: 'IS_NOT',
  IS_NOT_EQUALS_TO: 'IS_NOT_EQUALS_TO',
  DOES_NOT_BEGIN_WITH: 'DOES_NOT_BEGIN_WITH',
  DOES_NOT_END_WITH: 'DOES_NOT_END_WITH',
  DOES_NOT_CONTAIN: 'DOES_NOT_CONTAIN',
  IS_NOT_LESS_THAN: 'IS_NOT_LESS_THAN',
  IS_NOT_GREATER_THAN: 'IS_NOT_GREATER_THAN',
  IS_NOT_LESS_OR_EQUALS_THAN: 'IS_NOT_LESS_OR_EQUALS_THAN',
  IS_NOT_GREATER_OR_EQUALS_THAN: 'IS_NOT_GREATER_OR_EQUALS_THAN'
};
exports.CONDITIONS = CONDITIONS;
var DEFAULT_STATE = {
  field: '',
  value: '',
  type: '',
  condition: '',
  collection: ''
};
exports.DEFAULT_STATE = DEFAULT_STATE;
var _default = {
  CONDITIONS_LABEL: CONDITIONS_LABEL,
  CONDITIONS: CONDITIONS,
  DEFAULT_STATE: DEFAULT_STATE
};
exports["default"] = _default;