"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var React = _interopRequireWildcard(require("react"));

var _wrappers = require("./wrappers");

var _helpers = require("./helpers");

var _helpers2 = require("../helpers");

var _Select = _interopRequireDefault(require("../Select"));

var _constants = require("./constants");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

var mapFieldsToOptions = function mapFieldsToOptions(fields) {
  return fields.map(function (x) {
    return {
      text: x.label,
      value: x.name,
      key: x.name
    };
  });
};

var sortDirectionsOptions = Object.keys(_constants.SORT_DIRECTIONS).map(function (k) {
  return {
    text: _constants.SORT_DIRECTIONS[k],
    value: _constants.SORT_DIRECTIONS[k],
    key: k
  };
});

var Header = function Header(props) {
  var fields = props.fields,
      sort = props.sort,
      _onChange = props.onChange,
      actionsLabel = props.actionsLabel;
  var sortableFields = fields.filter(function (field) {
    return field.sortable;
  });
  return /*#__PURE__*/React.createElement(_wrappers.Table.Header, null, /*#__PURE__*/React.createElement(_wrappers.Table.Row, {
    modifiers: "fields"
  }, fields.map(function (field) {
    return /*#__PURE__*/React.createElement(_wrappers.Table.HeaderCell, {
      key: field.name,
      onClick: function onClick() {
        if (field.sortable) {
          var newDirection = (0, _helpers.toggleDirection)(sort.direction, field.name === sort.field);

          _onChange(field.name, newDirection);
        }
      }
    }, field.label, " ", sort.field === field.name && (0, _helpers.chevron)(sort.direction));
  }), actionsLabel && /*#__PURE__*/React.createElement(_wrappers.Table.HeaderCell, null, actionsLabel)), sortableFields.length > 0 && /*#__PURE__*/React.createElement(_wrappers.Table.Row, {
    modifiers: "sorter"
  }, /*#__PURE__*/React.createElement(_wrappers.Table.HeaderCell, {
    colSpan: fields.length + +!!actionsLabel
  }, "Sort by: ", /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement(_Select["default"], {
    placeholder: "Select field",
    options: mapFieldsToOptions(sortableFields),
    value: sort.field,
    onChange: function onChange(evt) {
      var value = evt.currentTarget.value;

      if (value) {
        _onChange(value, sort.direction);
      }
    }
  }), ' ', /*#__PURE__*/React.createElement(_Select["default"], {
    placeholder: "Select direction",
    options: sortDirectionsOptions,
    value: sort.direction,
    onChange: function onChange(evt) {
      var value = evt.currentTarget.value;

      if (value) {
        _onChange(sort.field, value);
      }
    }
  }))));
};

Header.defaultProps = {
  fields: [],
  onChange: _helpers2.NO_OP,
  actionsLabel: ''
};
var _default = Header;
exports["default"] = _default;