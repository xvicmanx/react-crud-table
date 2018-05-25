"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DeleteForm = exports.UpdateForm = exports.CreateForm = exports.Field = exports.Fields = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _propTypes = require("prop-types");

var _propTypes2 = _interopRequireDefault(_propTypes);

var _wrappers = require("./wrappers");

var _Header = require("./Header");

var _Header2 = _interopRequireDefault(_Header);

var _Body = require("./Body");

var _Body2 = _interopRequireDefault(_Body);

var _constants = require("./constants");

var _helpers = require("./helpers");

var _FormModal = require("../FormModal");

var _FormModal2 = _interopRequireDefault(_FormModal);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var FIELDS_COMPONENT_TYPE = 'CRUDTable_Fields';
var FIELD_COMPONENT_TYPE = 'CRUDTable_Field';
var CREATE_FORM_COMPONENT_TYPE = 'CRUDTable_CreateForm';
var DELETE_FORM_COMPONENT_TYPE = 'CRUDTable_DeleteForm';
var UPDATE_FORM_COMPONENT_TYPE = 'CRUDTable_UpdateForm';

var FILTER_BY_TYPE = function FILTER_BY_TYPE(t) {
  return function (item) {
    return item.type && item.type.displayName === t;
  };
};

var extractFields = function extractFields(items) {
  var container = items.find(FILTER_BY_TYPE(FIELDS_COMPONENT_TYPE));
  var children = container ? _react2.default.Children.toArray(container.props.children) : [];
  return children.filter(FILTER_BY_TYPE(FIELD_COMPONENT_TYPE)).map(function (c) {
    return c.props;
  });
};

var getProps = function getProps(comp) {
  var fields = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];

  var props = comp ? comp.props : null;
  if (!props) return props;
  return Object.assign({}, props, {
    fields: fields
  });
};

var extractForms = function extractForms(items, fields) {
  return {
    create: getProps(items.find(FILTER_BY_TYPE(CREATE_FORM_COMPONENT_TYPE)), fields.filter(function (f) {
      return !f.hideInCreateForm;
    })),
    update: getProps(items.find(FILTER_BY_TYPE(UPDATE_FORM_COMPONENT_TYPE)), fields.filter(function (f) {
      return !f.hideInUpdateForm;
    })),
    delete: getProps(items.find(FILTER_BY_TYPE(DELETE_FORM_COMPONENT_TYPE)))
  };
};

var CRUDTable = function (_React$Component) {
  _inherits(CRUDTable, _React$Component);

  function CRUDTable(props) {
    _classCallCheck(this, CRUDTable);

    var _this = _possibleConstructorReturn(this, (CRUDTable.__proto__ || Object.getPrototypeOf(CRUDTable)).call(this, props));

    _this.state = {
      items: props.values || [],
      sort: {
        field: _constants.ID_FIELD,
        direction: _constants.SORT_DIRECTIONS.DESCENDING
      },
      updateItem: {},
      deleteItem: {}
    };
    _this.updateModalController = null;
    _this.deleteModalController = null;
    _this.handleOnCreateSubmission = _this.handleOnCreateSubmission.bind(_this);
    _this.handleOnDeleteSubmission = _this.handleOnDeleteSubmission.bind(_this);
    _this.handleOnUpdateSubmission = _this.handleOnUpdateSubmission.bind(_this);
    _this.handleHeaderClick = _this.handleHeaderClick.bind(_this);

    var items = _react2.default.Children.toArray(props.children);
    _this.fields = extractFields(items);
    _this.forms = extractForms(items, _this.fields);
    return _this;
  }

  _createClass(CRUDTable, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this.update(this.state.sort, false);
    }
  }, {
    key: "update",
    value: function update(sort) {
      var _this2 = this;

      var reportChange = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

      if (this.props.fetchItems) {
        this.props.fetchItems({ sort: sort }).then(function (items) {
          _this2.setState({ items: items });
        });
      }

      if (reportChange) {
        this.props.onChange({ sort: sort });
      }
    }
  }, {
    key: "componentWillReceiveProps",
    value: function componentWillReceiveProps(nextProps) {
      if (nextProps.items !== this.props.items) {
        this.setState({ items: nextProps.items });
      }
    }
  }, {
    key: "handleHeaderClick",
    value: function handleHeaderClick(field, direction) {
      var sort = {
        field: field,
        direction: (0, _helpers.toggleDirection)(direction, field === this.state.sort.field)
      };
      this.setState({ sort: sort });
      this.update(sort);
    }
  }, {
    key: "handleOnCreateSubmission",
    value: function handleOnCreateSubmission(values) {
      var _this3 = this;

      this.forms.create.onSubmit(values).then(function () {
        _this3.update(_this3.state.sort);
      });
    }
  }, {
    key: "handleOnUpdateSubmission",
    value: function handleOnUpdateSubmission(values) {
      var _this4 = this;

      this.forms.update.onSubmit(values).then(function () {
        _this4.update(_this4.state.sort);
      });
    }
  }, {
    key: "handleOnDeleteSubmission",
    value: function handleOnDeleteSubmission(values) {
      var _this5 = this;

      this.forms.delete.onSubmit(values).then(function () {
        _this5.update(_this5.state.sort);
      });
    }
  }, {
    key: "render",
    value: function render() {
      var _this6 = this;

      var _state = this.state,
          items = _state.items,
          sort = _state.sort;

      return _react2.default.createElement(
        "div",
        null,
        this.forms.create && _react2.default.createElement(_FormModal2.default, {
          trigger: this.forms.create.trigger,
          data: this.forms.create,
          onSubmit: this.handleOnCreateSubmission
        }),
        _react2.default.createElement(
          _wrappers.Table,
          null,
          _react2.default.createElement(
            _wrappers.Table.Caption,
            null,
            this.props.caption
          ),
          _react2.default.createElement(_Header2.default, {
            fields: this.fields,
            sort: sort,
            onClick: this.handleHeaderClick,
            forms: this.forms,
            actionsLabel: this.props.actionsLabel
          }),
          _react2.default.createElement(_Body2.default, {
            fields: this.fields,
            items: items,
            forms: this.forms,
            onDeleteClick: function onDeleteClick(deleteItem) {
              _this6.setState({ deleteItem: deleteItem });
              _this6.deleteModalController.show();
            },
            onUpdateClick: function onUpdateClick(updateItem) {
              _this6.setState({ updateItem: updateItem });
              _this6.updateModalController.show();
            }
          })
        ),
        this.forms.update && _react2.default.createElement(_FormModal2.default, {
          initialValues: this.state.updateItem,
          data: this.forms.update,
          onSubmit: this.handleOnUpdateSubmission,
          onInit: function onInit(controller) {
            _this6.updateModalController = controller;
          }
        }),
        this.forms.delete && _react2.default.createElement(_FormModal2.default, {
          initialValues: this.state.deleteItem,
          data: this.forms.delete,
          onSubmit: this.handleOnDeleteSubmission,
          onInit: function onInit(controller) {
            _this6.deleteModalController = controller;
          }
        })
      );
    }
  }]);

  return CRUDTable;
}(_react2.default.Component);

CRUDTable.defaultProps = {
  onChange: function onChange() {},
  actionsLabel: 'Actions'
};

var Fields = exports.Fields = function Fields() {
  return _react2.default.createElement("div", null);
};
Fields.displayName = FIELDS_COMPONENT_TYPE;

var Field = exports.Field = function Field(_ref) {
  var name = _ref.name,
      label = _ref.label,
      tableValueResolver = _ref.tableValueResolver,
      hideInCreateForm = _ref.hideInCreateForm,
      hideInUpdateForm = _ref.hideInUpdateForm;
  return _react2.default.createElement("div", props);
};
Field.displayName = FIELD_COMPONENT_TYPE;
Field.propTypes = {
  name: _propTypes2.default.string.isRequired,
  label: _propTypes2.default.string.isRequired,
  tableValueResolver: _propTypes2.default.any,
  hideInCreateForm: _propTypes2.default.bool,
  hideInUpdateForm: _propTypes2.default.bool
};

var CreateForm = exports.CreateForm = function CreateForm() {
  return _react2.default.createElement("div", null);
};
CreateForm.displayName = CREATE_FORM_COMPONENT_TYPE;

var UpdateForm = exports.UpdateForm = function UpdateForm() {
  return _react2.default.createElement("div", null);
};
UpdateForm.displayName = UPDATE_FORM_COMPONENT_TYPE;

var DeleteForm = exports.DeleteForm = function DeleteForm() {
  return _react2.default.createElement("div", null);
};
DeleteForm.displayName = DELETE_FORM_COMPONENT_TYPE;

exports.default = CRUDTable;