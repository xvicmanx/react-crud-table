"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Pagination = exports.DeleteForm = exports.UpdateForm = exports.CreateForm = exports.Field = exports.Fields = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

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

var _Pagination = require("../Pagination");

var _Pagination2 = _interopRequireDefault(_Pagination);

var _constants = require("./constants");

var _helpers = require("./helpers");

var _FormModal = require("../FormModal");

var _FormModal2 = _interopRequireDefault(_FormModal);

var _QueryBuilder = require("../QueryBuilder");

var _QueryBuilder2 = _interopRequireDefault(_QueryBuilder);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var CRUDTable = function (_React$Component) {
  _inherits(CRUDTable, _React$Component);

  function CRUDTable(props) {
    _classCallCheck(this, CRUDTable);

    var _this = _possibleConstructorReturn(this, (CRUDTable.__proto__ || Object.getPrototypeOf(CRUDTable)).call(this, props));

    _this.updateModalController = null;
    _this.deleteModalController = null;
    _this.handleOnCreateSubmission = _this.handleOnCreateSubmission.bind(_this);
    _this.handleOnDeleteSubmission = _this.handleOnDeleteSubmission.bind(_this);
    _this.handleOnUpdateSubmission = _this.handleOnUpdateSubmission.bind(_this);
    _this.handleHeaderClick = _this.handleHeaderClick.bind(_this);
    _this.handlePaginationChange = _this.handlePaginationChange.bind(_this);
    _this.handleQueryChange = _this.handleQueryChange.bind(_this);

    var items = _react2.default.Children.toArray(props.children);
    _this.fields = (0, _helpers.extractFields)(items);
    _this.forms = (0, _helpers.extractForms)(items, _this.fields);
    _this.pagination = (0, _helpers.extractPagination)(items);
    _this.queryFields = (0, _helpers.extractQueryFields)(items);

    _this.state = {
      items: props.values || [],
      sort: {
        field: _constants.ID_FIELD,
        direction: _constants.SORT_DIRECTIONS.DESCENDING
      },
      queryRules: [],
      updateItem: {},
      deleteItem: {},
      pagination: _this.pagination,
      totalOfItems: _this.pagination.totalOfItems || 0
    };
    return _this;
  }

  _createClass(CRUDTable, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this.update(undefined, false);
    }
  }, {
    key: "update",
    value: function update(data) {
      var _this2 = this;

      var reportChange = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

      var payload = this.getPayload(data);
      if (this.props.fetchItems) {
        this.props.fetchItems(payload).then(function (items) {
          _this2.setState({ items: items });
        });
      }

      if (this.pagination.fetchTotalOfItems) {
        this.pagination.fetchTotalOfItems(payload).then(function (totalOfItems) {
          _this2.setState({ totalOfItems: totalOfItems });
        });
      }

      if (reportChange) {
        this.props.onChange(payload);
      }
    }
  }, {
    key: "componentWillReceiveProps",
    value: function componentWillReceiveProps(nextProps) {
      if (nextProps.items !== this.props.items) {
        this.setState({ items: nextProps.items });
      }

      if (nextProps.totalOfItems !== this.props.totalOfItems) {
        this.setState({ totalOfItems: nextProps.totalOfItems });
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
      this.update({ sort: sort });
    }
  }, {
    key: "getPayload",
    value: function getPayload() {
      var extension = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      return Object.assign({
        queryRules: this.state.queryRules,
        pagination: this.state.pagination,
        sort: this.state.sort
      }, extension);
    }
  }, {
    key: "handlePaginationChange",
    value: function handlePaginationChange(pagination) {
      this.setState({ pagination: pagination });
      this.update({ pagination: pagination });
    }
  }, {
    key: "handleQueryChange",
    value: function handleQueryChange(queryRules) {
      this.setState({ queryRules: queryRules });
      this.update({ queryRules: queryRules });
    }
  }, {
    key: "handleOnCreateSubmission",
    value: function handleOnCreateSubmission(values) {
      var _this3 = this;

      return this.forms.create.onSubmit(values).then(function (result) {
        _this3.update();
        return result;
      });
    }
  }, {
    key: "handleOnUpdateSubmission",
    value: function handleOnUpdateSubmission(values) {
      var _this4 = this;

      return this.forms.update.onSubmit(values).then(function (result) {
        _this4.update();
        return result;
      });
    }
  }, {
    key: "handleOnDeleteSubmission",
    value: function handleOnDeleteSubmission(values) {
      var _this5 = this;

      return this.forms.delete.onSubmit(values).then(function (result) {
        _this5.update();
        return result;
      });
    }
  }, {
    key: "render",
    value: function render() {
      var _this6 = this;

      var _state = this.state,
          items = _state.items,
          sort = _state.sort,
          pagination = _state.pagination;

      return _react2.default.createElement(
        "div",
        null,
        this.forms.create && _react2.default.createElement(_FormModal2.default, {
          trigger: this.forms.create.trigger,
          data: this.forms.create,
          onSubmit: this.handleOnCreateSubmission,
          shouldReset: true
        }),
        _react2.default.createElement(
          _wrappers.Table.Caption,
          null,
          this.props.caption
        ),
        this.props.showQueryBuilder && _react2.default.createElement(_QueryBuilder2.default, {
          fields: this.queryFields,
          onChange: this.handleQueryChange
        }),
        _react2.default.createElement(
          _wrappers.Table,
          null,
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
            actionsLabel: this.props.actionsLabel,
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
        !!pagination && !!this.state.totalOfItems && _react2.default.createElement(_Pagination2.default, _extends({}, pagination, {
          totalOfItems: this.state.totalOfItems,
          onChange: this.handlePaginationChange
        })),
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
  actionsLabel: 'Actions',
  showQueryBuilder: false
};

var Fields = exports.Fields = function Fields() {
  return _react2.default.createElement("div", null);
};
Fields.displayName = _constants.FIELDS_COMPONENT_TYPE;

var Field = exports.Field = function Field(_ref) {
  var name = _ref.name,
      label = _ref.label,
      tableValueResolver = _ref.tableValueResolver,
      hideInCreateForm = _ref.hideInCreateForm,
      hideInUpdateForm = _ref.hideInUpdateForm,
      queryable = _ref.queryable,
      type = _ref.type;
  return _react2.default.createElement("div", props);
};
Field.displayName = _constants.FIELD_COMPONENT_TYPE;
Field.propTypes = {
  name: _propTypes2.default.string.isRequired,
  label: _propTypes2.default.string.isRequired,
  type: _propTypes2.default.string,
  tableValueResolver: _propTypes2.default.any,
  hideInCreateForm: _propTypes2.default.bool,
  hideInUpdateForm: _propTypes2.default.bool,
  queryable: _propTypes2.default.bool,
  sortable: _propTypes2.default.bool
};
Field.defaultProps = {
  queryable: true,
  sortable: true,
  type: 'text',
  hideInCreateForm: false,
  hideInUpdateForm: false
};

var CreateForm = exports.CreateForm = function CreateForm() {
  return _react2.default.createElement("div", null);
};
CreateForm.displayName = _constants.CREATE_FORM_COMPONENT_TYPE;

var UpdateForm = exports.UpdateForm = function UpdateForm() {
  return _react2.default.createElement("div", null);
};
UpdateForm.displayName = _constants.UPDATE_FORM_COMPONENT_TYPE;

var DeleteForm = exports.DeleteForm = function DeleteForm() {
  return _react2.default.createElement("div", null);
};
DeleteForm.displayName = _constants.DELETE_FORM_COMPONENT_TYPE;

var Pagination = exports.Pagination = function Pagination() {
  return _react2.default.createElement("div", null);
};
Pagination.displayName = _constants.PAGINATION_COMPONENT_TYPE;

exports.default = CRUDTable;