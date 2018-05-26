"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _reactDom = require("react-dom");

var _CRUDTable = require("./CRUDTable");

var _CRUDTable2 = _interopRequireDefault(_CRUDTable);

var _plus = require("./assets/plus.svg");

var _plus2 = _interopRequireDefault(_plus);

require("./index.css");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var styles = {
  fontFamily: "sans-serif",
  textAlign: "center"
};

var renderer = function renderer(_ref) {
  var field = _ref.field;
  return _react2.default.createElement("input", field);
};

var fields = [{
  name: "id",
  label: _react2.default.createElement(
    "span",
    { style: { marginLeft: "3px" } },
    "ID"
  ),
  render: renderer
}, {
  name: "name",
  label: "Nombre",
  placeholder: 'Nombre',
  render: renderer
}, {
  name: "description",
  label: "Descripcion",
  render: renderer,
  tableValueResolver: 'description'
}];

var items = [{
  id: 1,
  name: "test",
  description: "wepa"
}, {
  id: 2,
  name: "foo",
  description: "Foo"
}, {
  id: 3,
  name: "bar",
  description: "Bar"
}, {
  id: 4,
  name: "FR",
  description: "FR"
}, {
  id: 1,
  name: "test",
  description: "wepa"
}, {
  id: 2,
  name: "foo",
  description: "Foo"
}, {
  id: 3,
  name: "bar",
  description: "Bar"
}, {
  id: 4,
  name: "FR",
  description: "FR"
}, {
  id: 1,
  name: "test",
  description: "wepa"
}, {
  id: 2,
  name: "foo",
  description: "Foo"
}, {
  id: 3,
  name: "bar",
  description: "Bar"
}, {
  id: 4,
  name: "FR",
  description: "FR"
}];

var config = {
  forms: {
    create: {
      message: "Create a new Item",
      trigger: "Create",
      fields: fields.filter(function (f) {
        return f.name !== 'id';
      }),
      onSubmit: function onSubmit(item) {
        items.push(item);
        return Promise.resolve(true);
      },

      submitText: "Create",
      validate: function validate(values) {
        var errors = {};
        if (!values.name) {
          errors.name = 'Please Insert name';
        }
        return errors;
      }
    },
    update: {
      message: "Update the item",
      trigger: "Update",
      fields: fields,
      onSubmit: function onSubmit(item) {
        return Promise.resolve(true);
      },

      submitText: "Update",
      submitButtonProps: {
        modifiers: 'primary'
      },
      validate: function validate(values) {
        var errors = {};
        if (!values.id) {
          errors.id = 'Please Insert id';
        }
        if (!values.name) {
          errors.name = 'Please Insert name';
        }
        return errors;
      }
    },
    delete: {
      message: "Are you sure you want to remove the item?",
      trigger: "Delete",
      fields: [],
      onSubmit: function onSubmit(item) {
        return Promise.resolve(true);
      },

      submitText: "Delete",
      submitButtonProps: {
        modifiers: 'negative'
      },
      validate: function validate(values) {
        var errors = {};
        if (!values.id) {
          errors.id = 'Please Insert id';
        }
        return errors;
      }
    }
  },
  fields: fields,
  readValues: function readValues(_ref2) {
    var sort = _ref2.sort;

    var result = items;
    var sorters = {
      descending: function descending(a, b) {
        return b[sort.field] - a[sort.field];
      },
      ascending: function ascending(a, b) {
        return a[sort.field] - b[sort.field];
      }
    };
    result = result.sort(sorters[sort.direction]);
    return Promise.resolve(result);
  }
};

var App = function (_React$Component) {
  _inherits(App, _React$Component);

  function App(props) {
    _classCallCheck(this, App);

    return _possibleConstructorReturn(this, (App.__proto__ || Object.getPrototypeOf(App)).call(this, props));
  }

  _createClass(App, [{
    key: "render",
    value: function render() {
      return _react2.default.createElement(
        "div",
        { style: styles },
        _react2.default.createElement(SmartTable, { config: config })
      );
    }
  }]);

  return App;
}(_react2.default.Component);

(0, _reactDom.render)(_react2.default.createElement(App, null), document.getElementById("root"));