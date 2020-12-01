"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.extractForms = exports.extractQueryFields = exports.extractPagination = exports.extractFields = exports.getProps = exports.FILTER_BY_TYPE = exports.queryValue = exports.toggleDirection = exports.chevron = void 0;

var _react = _interopRequireDefault(require("react"));

var _constants = require("./constants");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var chevron = function chevron(direction) {
  return direction === _constants.SORT_DIRECTIONS.ASCENDING ? /*#__PURE__*/_react["default"].createElement("span", null, "\u25B2") : /*#__PURE__*/_react["default"].createElement("span", null, "\u25BC");
};

exports.chevron = chevron;

var toggleDirection = function toggleDirection(direction, toggle) {
  if (toggle) {
    switch (direction) {
      case "ascending":
        return "descending";

      default:
        return "ascending";
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
  return Object.assign({}, props, {
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
    return Object.assign({}, f, {
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
var _default = {
  chevron: chevron,
  toggleDirection: toggleDirection,
  queryValue: queryValue,
  FILTER_BY_TYPE: FILTER_BY_TYPE,
  extractFields: extractFields,
  getProps: getProps,
  extractForms: extractForms,
  extractPagination: extractPagination,
  extractQueryFields: extractQueryFields
};
exports["default"] = _default;