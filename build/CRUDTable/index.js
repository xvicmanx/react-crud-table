"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.Pagination = exports.DeleteForm = exports.UpdateForm = exports.CreateForm = exports.Field = exports.Fields = void 0;

var React = _interopRequireWildcard(require("react"));

var _constants = require("./constants");

var _helpers = require("./helpers");

var _wrappers = require("./wrappers");

var _Header = _interopRequireDefault(require("./Header"));

var _Body = _interopRequireDefault(require("./Body"));

var _Pagination = _interopRequireDefault(require("../Pagination"));

var _FormModal = _interopRequireDefault(require("../FormModal"));

var _QueryBuilder = _interopRequireDefault(require("../QueryBuilder"));

var _helpers2 = require("../helpers");

var _actions = require("./actions");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

var CRUDTable = /*#__PURE__*/function (_React$Component) {
  _inherits(CRUDTable, _React$Component);

  var _super = _createSuper(CRUDTable);

  function CRUDTable(props) {
    var _this;

    _classCallCheck(this, CRUDTable);

    _this = _super.call(this, props);

    var target = _assertThisInitialized(_this);

    target.handleOnCreateSubmission = _this.handleOnCreateSubmission.bind(_assertThisInitialized(_this));
    target.handleOnDeleteSubmission = _this.handleOnDeleteSubmission.bind(_assertThisInitialized(_this));
    target.handleOnUpdateSubmission = _this.handleOnUpdateSubmission.bind(_assertThisInitialized(_this));
    target.handleSortChange = _this.handleSortChange.bind(_assertThisInitialized(_this));
    target.handlePageChange = _this.handlePageChange.bind(_assertThisInitialized(_this));
    target.handleRuleAdded = _this.handleRuleAdded.bind(_assertThisInitialized(_this));
    target.handleRuleRemoved = _this.handleRuleRemoved.bind(_assertThisInitialized(_this));
    var configItems = React.Children.toArray(props.children);
    _this.fields = (0, _helpers.extractFields)(configItems);
    _this.forms = (0, _helpers.extractForms)(configItems, _this.fields);
    _this.pagination = (0, _helpers.extractPagination)(configItems);
    _this.queryFields = (0, _helpers.extractQueryFields)(configItems);
    _this.state = (0, _helpers.getDefaultState)(props.items, _this.pagination);
    return _this;
  }

  _createClass(CRUDTable, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this.update(undefined, false);
    } // eslint-disable-next-line camelcase

  }, {
    key: "UNSAFE_componentWillReceiveProps",
    value: function UNSAFE_componentWillReceiveProps(nextProps) {
      var items = this.props.items;
      var newState = {};

      if (nextProps.items !== items) {
        newState.items = nextProps.items;
        var paginationProps = (0, _helpers.getPaginationProps)(nextProps);
        newState.totalOfItems = paginationProps.totalOfItems || 0;
      }

      if (Object.keys(newState).length) {
        this.setState(newState);
      }
    }
  }, {
    key: "handleSortChange",
    value: function handleSortChange(field, direction) {
      var _this2 = this;

      this.setState((0, _actions.changeSort)(field, direction), function () {
        var sort = _this2.state.sort;

        _this2.update({
          sort: sort
        });
      });
    }
  }, {
    key: "handlePageChange",
    value: function handlePageChange(activePage) {
      var _this3 = this;

      this.setState((0, _actions.changePage)(activePage), function () {
        var pagination = _this3.state.pagination;

        _this3.update({
          pagination: pagination
        });
      });
    }
  }, {
    key: "handleOnCreateSubmission",
    value: function handleOnCreateSubmission(values) {
      return this.formSubmission(this.forms.create, values);
    }
  }, {
    key: "handleOnUpdateSubmission",
    value: function handleOnUpdateSubmission(values) {
      return this.formSubmission(this.forms.update, values);
    }
  }, {
    key: "handleOnDeleteSubmission",
    value: function handleOnDeleteSubmission(values) {
      return this.formSubmission(this.forms["delete"], values);
    }
  }, {
    key: "formSubmission",
    value: function formSubmission(form, values) {
      var _this4 = this;

      return form.onSubmit(values).then(function (result) {
        _this4.update();

        return result;
      });
    }
  }, {
    key: "handleRuleAdded",
    value: function handleRuleAdded(rule) {
      var _this5 = this;

      this.setState((0, _actions.addRule)(rule), function () {
        var queryRules = _this5.state.queryRules;

        _this5.update({
          queryRules: queryRules
        });
      });
    }
  }, {
    key: "handleRuleRemoved",
    value: function handleRuleRemoved(rule) {
      var _this6 = this;

      this.setState((0, _actions.removeRule)(rule), function () {
        var queryRules = _this6.state.queryRules;

        _this6.update({
          queryRules: queryRules
        });
      });
    }
  }, {
    key: "getPayload",
    value: function getPayload() {
      var extension = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var _this$state = this.state,
          queryRules = _this$state.queryRules,
          pagination = _this$state.pagination,
          sort = _this$state.sort;
      return _objectSpread({
        queryRules: queryRules,
        pagination: pagination,
        sort: sort
      }, extension);
    }
  }, {
    key: "update",
    value: function update() {
      var _this7 = this;

      var data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : undefined;
      var reportChange = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
      var _this$props = this.props,
          fetchItems = _this$props.fetchItems,
          onChange = _this$props.onChange;
      var payload = this.getPayload(data);

      if (fetchItems) {
        fetchItems(payload).then(function (items) {
          _this7.setState({
            items: items
          });
        });
      }

      if (this.pagination.fetchTotalOfItems) {
        this.pagination.fetchTotalOfItems(payload).then(function (totalOfItems) {
          _this7.setState({
            totalOfItems: totalOfItems
          });
        });
      }

      if (reportChange) {
        onChange(payload);
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _this8 = this;

      var _this$state2 = this.state,
          items = _this$state2.items,
          sort = _this$state2.sort,
          pagination = _this$state2.pagination,
          totalOfItems = _this$state2.totalOfItems,
          deleteItem = _this$state2.deleteItem,
          updateItem = _this$state2.updateItem,
          queryRules = _this$state2.queryRules,
          createModalVisible = _this$state2.createModalVisible,
          deleteModalVisible = _this$state2.deleteModalVisible,
          updateModalVisible = _this$state2.updateModalVisible;
      var _this$props2 = this.props,
          caption = _this$props2.caption,
          showQueryBuilder = _this$props2.showQueryBuilder,
          actionsLabel = _this$props2.actionsLabel;
      var tabularFields = this.fields.filter(function (f) {
        return !f.hideFromTable;
      });
      var updateTrigger = (0, _helpers.queryValue)(this.forms, 'update.trigger');
      var deleteTrigger = (0, _helpers.queryValue)(this.forms, 'delete.trigger');
      return /*#__PURE__*/React.createElement("div", null, this.forms.create && /*#__PURE__*/React.createElement(_FormModal["default"], {
        trigger: this.forms.create.trigger,
        data: this.forms.create,
        onSubmit: this.handleOnCreateSubmission,
        shouldReset: true,
        visible: createModalVisible,
        onVisibilityChange: function onVisibilityChange(visible) {
          _this8.setState({
            createModalVisible: visible
          });
        }
      }), caption && /*#__PURE__*/React.createElement(_wrappers.Table.Caption, null, caption), showQueryBuilder && /*#__PURE__*/React.createElement(_QueryBuilder["default"], {
        queryRules: queryRules,
        fields: this.queryFields,
        onRuleAdded: this.handleRuleAdded,
        onRuleRemoved: this.handleRuleRemoved
      }), /*#__PURE__*/React.createElement(_wrappers.Table, null, /*#__PURE__*/React.createElement(_Header["default"], {
        fields: tabularFields,
        sort: sort,
        onChange: this.handleSortChange,
        actionsLabel: updateTrigger || deleteTrigger ? actionsLabel : ''
      }), /*#__PURE__*/React.createElement(_Body["default"], {
        fields: tabularFields,
        items: items,
        updateTrigger: updateTrigger,
        deleteTrigger: deleteTrigger,
        actionsLabel: actionsLabel,
        onDeleteClick: function onDeleteClick(item) {
          _this8.setState({
            deleteItem: item,
            deleteModalVisible: true
          });
        },
        onUpdateClick: function onUpdateClick(item) {
          _this8.setState({
            updateItem: item,
            updateModalVisible: true
          });
        }
      })), !!pagination && totalOfItems > 0 && /*#__PURE__*/React.createElement(_Pagination["default"], _extends({}, pagination, {
        totalOfItems: totalOfItems,
        onPageChange: this.handlePageChange
      })), this.forms.update && /*#__PURE__*/React.createElement(_FormModal["default"], {
        initialValues: updateItem,
        data: this.forms.update,
        onSubmit: this.handleOnUpdateSubmission,
        visible: updateModalVisible,
        onVisibilityChange: function onVisibilityChange(visible) {
          _this8.setState({
            updateModalVisible: visible
          });
        }
      }), this.forms["delete"] && /*#__PURE__*/React.createElement(_FormModal["default"], {
        initialValues: deleteItem,
        data: this.forms["delete"],
        onSubmit: this.handleOnDeleteSubmission,
        visible: deleteModalVisible,
        trigger: null,
        onVisibilityChange: function onVisibilityChange(visible) {
          _this8.setState({
            deleteModalVisible: visible
          });
        }
      }));
    }
  }]);

  return CRUDTable;
}(React.Component); // $FlowFixMe


CRUDTable.defaultProps = {
  onChange: _helpers2.NO_OP,
  actionsLabel: 'Actions',
  showQueryBuilder: false,
  items: [],
  caption: null,
  fetchItems: null
};

var Fields = function Fields() {
  return /*#__PURE__*/React.createElement("div", null);
};

exports.Fields = Fields;
Fields.displayName = _constants.FIELDS_COMPONENT_TYPE;

var Field = function Field(props) {
  var name = props.name,
      label = props.label,
      tableValueResolver = props.tableValueResolver,
      hideInCreateForm = props.hideInCreateForm,
      hideInUpdateForm = props.hideInUpdateForm,
      hideFromTable = props.hideFromTable,
      queryable = props.queryable,
      type = props.type,
      sortable = props.sortable;
  return /*#__PURE__*/React.createElement("div", null);
};

exports.Field = Field;
Field.displayName = _constants.FIELD_COMPONENT_TYPE;
Field.defaultProps = {
  queryable: true,
  sortable: true,
  type: 'text',
  hideInCreateForm: false,
  hideInUpdateForm: false,
  hideFromTable: false,
  tableValueResolver: null
};

var CreateForm = function CreateForm() {
  return /*#__PURE__*/React.createElement("div", null);
};

exports.CreateForm = CreateForm;
CreateForm.displayName = _constants.CREATE_FORM_COMPONENT_TYPE;

var UpdateForm = function UpdateForm() {
  return /*#__PURE__*/React.createElement("div", null);
};

exports.UpdateForm = UpdateForm;
UpdateForm.displayName = _constants.UPDATE_FORM_COMPONENT_TYPE;

var DeleteForm = function DeleteForm() {
  return /*#__PURE__*/React.createElement("div", null);
};

exports.DeleteForm = DeleteForm;
DeleteForm.displayName = _constants.DELETE_FORM_COMPONENT_TYPE;

var Pagination = function Pagination() {
  return /*#__PURE__*/React.createElement("div", null);
};

exports.Pagination = Pagination;
Pagination.displayName = _constants.PAGINATION_COMPONENT_TYPE;
var _default = CRUDTable;
exports["default"] = _default;