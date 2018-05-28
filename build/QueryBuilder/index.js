'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _RuleBuilder = require('./RuleBuilder');

var _RuleBuilder2 = _interopRequireDefault(_RuleBuilder);

var _Rules = require('./Rules');

var _Rules2 = _interopRequireDefault(_Rules);

var _wrappers = require('./wrappers');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var styles = void 0;

var QueryBuilder = function (_React$Component) {
  _inherits(QueryBuilder, _React$Component);

  function QueryBuilder(props) {
    _classCallCheck(this, QueryBuilder);

    var _this = _possibleConstructorReturn(this, (QueryBuilder.__proto__ || Object.getPrototypeOf(QueryBuilder)).call(this, props));

    _this.state = { query: [] };
    _this.remove = _this.remove.bind(_this);
    _this.handleSave = _this.handleSave.bind(_this);
    return _this;
  }

  _createClass(QueryBuilder, [{
    key: 'remove',
    value: function remove(rule) {
      var update = {
        query: this.state.query.filter(function (x) {
          return x.field !== rule.field || x.condition !== rule.condition;
        })
      };
      this.setState(update);
      this.props.onChange(update.query);
    }
  }, {
    key: 'handleSave',
    value: function handleSave(selection) {
      var update = {
        query: [].concat(_toConsumableArray(this.state.query), [selection])
      };
      this.setState(update);
      this.props.onChange(update.query);
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      return _react2.default.createElement(
        _wrappers.Container,
        null,
        _react2.default.createElement(_RuleBuilder2.default, {
          fields: this.props.fields,
          onSave: this.handleSave
        }),
        _react2.default.createElement(_Rules2.default, {
          queries: this.state.query,
          onRuleRemoved: function onRuleRemoved(rule) {
            return _this2.remove(rule);
          },
          renderRule: this.props.renderRule
        })
      );
    }
  }]);

  return QueryBuilder;
}(_react2.default.Component);

QueryBuilder.defaultProps = {
  fields: [],
  onChange: function onChange() {}
};

exports.default = QueryBuilder;