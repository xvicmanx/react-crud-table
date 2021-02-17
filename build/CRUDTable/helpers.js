"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.scrollToTop = exports.getDefaultState = exports.getPaginationProps = exports.getTableFieldValue = exports.extractForms = exports.extractQueryFields = exports.extractPagination = exports.extractFields = exports.getProps = exports.FILTER_BY_TYPE = exports.queryValue = exports.toggleDirection = exports.chevron = void 0;

var _react = _interopRequireDefault(require("react"));

var _constants = require("./constants");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var UpArrow = function UpArrow() {
  return /*#__PURE__*/_react["default"].createElement("span", null, "\u25B2");
};

var DownArrow = function DownArrow() {
  return /*#__PURE__*/_react["default"].createElement("span", null, "\u25BC");
};

var chevron = function chevron(direction) {
  if (direction === _constants.SORT_DIRECTIONS.ASCENDING) {
    return /*#__PURE__*/_react["default"].createElement(UpArrow, null);
  }

  return /*#__PURE__*/_react["default"].createElement(DownArrow, null);
};

exports.chevron = chevron;

var toggleDirection = function toggleDirection(direction, toggle) {
  if (toggle) {
    switch (direction) {
      case 'ascending':
        return 'descending';

      default:
        return 'ascending';
    }
  }

  return direction;
};

exports.toggleDirection = toggleDirection;

var queryValue = function queryValue(source) {
  var query = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
  var defaultValue = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
  var value = query.split('.').reduce(function (result, key) {
    return result && result[key] ? result[key] : null;
  }, source);
  return value || defaultValue;
};

exports.queryValue = queryValue;

var FILTER_BY_TYPE = function FILTER_BY_TYPE(t) {
  return function (item) {
    return item.type && item.type.displayName === t;
  };
};

exports.FILTER_BY_TYPE = FILTER_BY_TYPE;

var getProps = function getProps(comp) {
  var fields = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
  var defaultValue = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
  var props = comp ? comp.props : null;
  if (!props) return defaultValue;
  return _objectSpread(_objectSpread({}, props), {}, {
    fields: fields
  });
};

exports.getProps = getProps;

var extractFields = function extractFields(items) {
  var container = items.find(FILTER_BY_TYPE(_constants.FIELDS_COMPONENT_TYPE));
  var children = container ? _react["default"].Children.toArray(container.props.children) : [];
  return children.filter(FILTER_BY_TYPE(_constants.FIELD_COMPONENT_TYPE)).map(function (c) {
    return c.props;
  });
};

exports.extractFields = extractFields;

var extractPagination = function extractPagination(items) {
  var container = items.find(FILTER_BY_TYPE(_constants.PAGINATION_COMPONENT_TYPE));
  return getProps(container, [], {});
};

exports.extractPagination = extractPagination;

var extractQueryFields = function extractQueryFields(items) {
  var fields = extractFields(items);
  return fields.filter(function (f) {
    return f.queryable;
  }).map(function (f) {
    return _objectSpread(_objectSpread({}, f), {}, {
      value: f.name
    });
  });
};

exports.extractQueryFields = extractQueryFields;

var extractForms = function extractForms(items, fields) {
  return {
    create: getProps(items.find(FILTER_BY_TYPE(_constants.CREATE_FORM_COMPONENT_TYPE)), fields.filter(function (f) {
      return !f.hideInCreateForm;
    })),
    update: getProps(items.find(FILTER_BY_TYPE(_constants.UPDATE_FORM_COMPONENT_TYPE)), fields.filter(function (f) {
      return !f.hideInUpdateForm;
    })),
    "delete": getProps(items.find(FILTER_BY_TYPE(_constants.DELETE_FORM_COMPONENT_TYPE)))
  };
};

exports.extractForms = extractForms;

var getTableFieldValue = function getTableFieldValue(field, item) {
  if (typeof field.tableValueResolver === 'string') {
    return queryValue(item, field.tableValueResolver);
  }

  if (typeof field.tableValueResolver === 'function') {
    return field.tableValueResolver(item);
  }

  return item[field.name];
};

exports.getTableFieldValue = getTableFieldValue;

var getPaginationProps = function getPaginationProps(props) {
  var items = _react["default"].Children.toArray(props.children);

  return extractPagination(items);
};

exports.getPaginationProps = getPaginationProps;

var getDefaultState = function getDefaultState(items, pagination) {
  return {
    items: items,
    sort: {
      field: _constants.ID_FIELD,
      direction: _constants.SORT_DIRECTIONS.DESCENDING
    },
    queryRules: [],
    updateItem: {},
    deleteItem: {},
    createModalVisible: false,
    deleteModalVisible: false,
    updateModalVisible: false,
    pagination: _objectSpread(_objectSpread({}, pagination), {}, {
      activePage: pagination.activePage || pagination.defaultActivePage || 1,
      totalOfItems: pagination.totalOfItems || 0,
      itemsPerPage: pagination.itemsPerPage || 10
    }),
    totalOfItems: pagination.totalOfItems || 0
  };
};

exports.getDefaultState = getDefaultState;

var scrollToTop = function scrollToTop() {
  if (typeof window !== 'undefined' && window.scrollTo) {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }
};

exports.scrollToTop = scrollToTop;
var _default = {
  chevron: chevron,
  toggleDirection: toggleDirection,
  queryValue: queryValue,
  getTableFieldValue: getTableFieldValue,
  FILTER_BY_TYPE: FILTER_BY_TYPE,
  extractFields: extractFields,
  getProps: getProps,
  extractForms: extractForms,
  extractPagination: extractPagination,
  extractQueryFields: extractQueryFields,
  getPaginationProps: getPaginationProps
};
exports["default"] = _default;