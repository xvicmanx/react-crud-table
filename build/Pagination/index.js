'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _wrappers = require('./wrappers');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var numbersTo = function numbersTo(n) {
  var numbers = [];
  for (var i = 0; i < n; i++) {
    numbers.push(i + 1);
  }
  return numbers;
};

var Pagination = function (_Component) {
  _inherits(Pagination, _Component);

  function Pagination(props) {
    _classCallCheck(this, Pagination);

    var _this = _possibleConstructorReturn(this, (Pagination.__proto__ || Object.getPrototypeOf(Pagination)).call(this, props));

    _this.state = {
      activePage: props.defaultActivePage,
      totalOfItems: props.totalOfItems
    };
    _this.handleNextClick = _this.handleNextClick.bind(_this);
    _this.handlePreviousClick = _this.handlePreviousClick.bind(_this);
    _this.handleLinkClick = _this.handleLinkClick.bind(_this);
    return _this;
  }

  _createClass(Pagination, [{
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      if (nextProps.totalOfItems !== this.props.totalOfItems) {
        this.setState({
          totalOfItems: nextProps.totalOfItems
        });
      }
    }
  }, {
    key: 'update',
    value: function update(activePage) {
      this.setState({ activePage: activePage });
      this.props.onChange({
        activePage: activePage,
        totalOfItems: this.props.totalOfItems,
        itemsPerPage: this.props.itemsPerPage
      });
    }
  }, {
    key: 'calculateNumberOfPages',
    value: function calculateNumberOfPages() {
      return Math.ceil(this.props.totalOfItems / this.props.itemsPerPage);
    }
  }, {
    key: 'handlePreviousClick',
    value: function handlePreviousClick() {
      if (this.state.activePage > 1) {
        this.update(this.state.activePage - 1);
      }
    }
  }, {
    key: 'handleNextClick',
    value: function handleNextClick() {
      var numberOfPages = this.calculateNumberOfPages();
      if (this.state.activePage < numberOfPages) {
        this.update(this.state.activePage + 1);
      }
    }
  }, {
    key: 'handleLinkClick',
    value: function handleLinkClick(evt) {
      this.update(+evt.target.textContent.trim());
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var numberOfPages = this.calculateNumberOfPages();
      var numbers = numbersTo(numberOfPages);
      return _react2.default.createElement(
        _wrappers.Pagination,
        null,
        _react2.default.createElement(
          _wrappers.Pagination.Prev,
          { onClick: this.handlePreviousClick },
          '\xAB'
        ),
        numbers.map(function (i) {
          return _react2.default.createElement(
            _wrappers.Pagination.Link,
            {
              modifiers: i === _this2.state.activePage ? 'active' : 'inactive',
              onClick: _this2.handleLinkClick
            },
            i
          );
        }),
        _react2.default.createElement(
          _wrappers.Pagination.Next,
          { onClick: this.handleNextClick },
          '\xBB'
        )
      );
    }
  }]);

  return Pagination;
}(_react.Component);

Pagination.propTypes = {
  defaultActivePage: _propTypes2.default.number,
  itemsPerPage: _propTypes2.default.number,
  totalOfItems: _propTypes2.default.number,
  onChange: _propTypes2.default.func
};

Pagination.defaultProps = {
  defaultActivePage: 1,
  totalOfItems: 0,
  itemsPerPage: 10,
  onChange: function onChange() {}
};

exports.default = Pagination;