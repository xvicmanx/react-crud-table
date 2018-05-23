"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

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

var SmartTable = function (_React$Component) {
  _inherits(SmartTable, _React$Component);

  function SmartTable(props) {
    _classCallCheck(this, SmartTable);

    var _this = _possibleConstructorReturn(this, (SmartTable.__proto__ || Object.getPrototypeOf(SmartTable)).call(this, props));

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
    return _this;
  }

  _createClass(SmartTable, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this.update(this.state.sort);
    }
  }, {
    key: "update",
    value: function update(sort) {
      var _this2 = this;

      if (this.props.config.readValues) {
        this.props.config.readValues({ sort: sort }).then(function (items) {
          _this2.setState({ items: items });
        });
      }
    }
  }, {
    key: "componentWillReceiveProps",
    value: function componentWillReceiveProps(nextProps) {
      if (nextProps.values !== this.props.values) {
        this.setState({ items: nextProps.values });
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

      this.props.config.forms.create.onSubmit(values).then(function () {
        _this3.update(_this3.state.sort);
      });
    }
  }, {
    key: "handleOnUpdateSubmission",
    value: function handleOnUpdateSubmission(values) {
      var _this4 = this;

      this.props.config.forms.update.onSubmit(values).then(function () {
        _this4.update(_this4.state.sort);
      });
    }
  }, {
    key: "handleOnDeleteSubmission",
    value: function handleOnDeleteSubmission(values) {
      var _this5 = this;

      this.props.config.forms.delete.onSubmit(values).then(function () {
        _this5.update(_this5.state.sort);
      });
    }
  }, {
    key: "render",
    value: function render() {
      var _this6 = this;

      var _props$config = this.props.config,
          fields = _props$config.fields,
          forms = _props$config.forms;
      var _state = this.state,
          items = _state.items,
          sort = _state.sort;

      return _react2.default.createElement(
        "div",
        null,
        _react2.default.createElement(
          _wrappers.Table,
          null,
          _react2.default.createElement(
            _wrappers.Table.Caption,
            null,
            _react2.default.createElement(_FormModal2.default, {
              trigger: forms.create.trigger,
              data: forms.create,
              onSubmit: this.handleOnCreateSubmission
            })
          ),
          _react2.default.createElement(_Header2.default, {
            fields: fields,
            sort: sort,
            onClick: this.handleHeaderClick,
            forms: forms
          }),
          _react2.default.createElement(_Body2.default, {
            fields: fields,
            items: items,
            forms: forms,
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
        _react2.default.createElement(_FormModal2.default, {
          initialValues: this.state.updateItem,
          data: forms.update,
          onSubmit: this.handleOnUpdateSubmission,
          onInit: function onInit(controller) {
            _this6.updateModalController = controller;
          }
        }),
        _react2.default.createElement(_FormModal2.default, {
          initialValues: this.state.deleteItem,
          data: forms.delete,
          onSubmit: this.handleOnDeleteSubmission,
          onInit: function onInit(controller) {
            _this6.deleteModalController = controller;
          }
        })
      );
    }
  }]);

  return SmartTable;
}(_react2.default.Component);

exports.default = SmartTable;