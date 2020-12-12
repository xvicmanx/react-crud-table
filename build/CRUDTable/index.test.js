"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var _react = _interopRequireDefault(require("react"));

var _shallow = _interopRequireDefault(require("react-test-renderer/shallow"));

var _reactTestRenderer = require("react-test-renderer");

var _ = _interopRequireWildcard(require("."));

var _Header = _interopRequireDefault(require("./Header"));

var _Body = _interopRequireDefault(require("./Body"));

var _Pagination = _interopRequireDefault(require("../Pagination"));

var _FormModal = _interopRequireDefault(require("../FormModal"));

var _QueryBuilder = _interopRequireDefault(require("../QueryBuilder"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

// eslint-disable-next-line react/prop-types
var DescriptionRenderer = function DescriptionRenderer(_ref) {
  var field = _ref.field;
  return /*#__PURE__*/_react["default"].createElement("textarea", field);
};

var renderer = new _shallow["default"]();
describe('CRUDTable', function () {
  var tasks;
  var createValidate;
  var updateValidate;
  var deleteValidate;
  var createSubmit;
  var updateSubmit;
  var deleteSubmit;
  var onChange;
  beforeEach(function () {
    tasks = [{
      id: 1,
      title: 'Create an example',
      description: 'Create an example of how to use the component'
    }, {
      id: 2,
      title: 'Improve',
      description: 'Improve the component!'
    }];
    createValidate = jest.fn();
    updateValidate = jest.fn();
    deleteValidate = jest.fn();
    createSubmit = jest.fn(function () {
      return Promise.resolve({
        success: true
      });
    });
    updateSubmit = jest.fn(function () {
      return Promise.resolve({
        success: true
      });
    });
    deleteSubmit = jest.fn(function () {
      return Promise.resolve({
        success: true
      });
    });
    onChange = jest.fn();
  });
  it('renders as expected with forms, query builder, and pagination', function () {
    var result = renderer.render( /*#__PURE__*/_react["default"].createElement(_["default"], {
      caption: "Tasks",
      items: tasks,
      showQueryBuilder: true
    }, /*#__PURE__*/_react["default"].createElement(_.Fields, null, /*#__PURE__*/_react["default"].createElement(_.Field, {
      name: "id",
      label: "Id",
      hideInCreateForm: true,
      readOnly: true
    }), /*#__PURE__*/_react["default"].createElement(_.Field, {
      name: "title",
      label: "Title",
      placeholder: "Title"
    }), /*#__PURE__*/_react["default"].createElement(_.Field, {
      name: "description",
      label: "Description",
      render: DescriptionRenderer
    })), /*#__PURE__*/_react["default"].createElement(_.CreateForm, {
      title: "Task Creation",
      message: "Create a new task!",
      trigger: "Create Task",
      onSubmit: createSubmit,
      submitText: "Create",
      validate: createValidate
    }), /*#__PURE__*/_react["default"].createElement(_.UpdateForm, {
      title: "Task Update Process",
      message: "Update task",
      trigger: "Update",
      onSubmit: updateSubmit,
      submitText: "Update",
      validate: updateValidate
    }), /*#__PURE__*/_react["default"].createElement(_.DeleteForm, {
      title: "Task Delete Process",
      message: "Are you sure you want to delete the task?",
      trigger: "Delete",
      onSubmit: deleteSubmit,
      submitText: "Delete",
      validate: deleteValidate
    }), /*#__PURE__*/_react["default"].createElement(_.Pagination, {
      itemsPerPage: 2,
      totalOfItems: tasks.length
    })));
    expect(result).toMatchSnapshot();
  });
  it('renders as expected without forms, query builder, and pagination', function () {
    var result = renderer.render( /*#__PURE__*/_react["default"].createElement(_["default"], {
      caption: "Tasks",
      items: tasks
    }, /*#__PURE__*/_react["default"].createElement(_.Fields, null, /*#__PURE__*/_react["default"].createElement(_.Field, {
      name: "id",
      label: "Id",
      hideInCreateForm: true,
      readOnly: true
    }), /*#__PURE__*/_react["default"].createElement(_.Field, {
      name: "title",
      label: "Title",
      placeholder: "Title"
    }), /*#__PURE__*/_react["default"].createElement(_.Field, {
      name: "description",
      label: "Description",
      render: DescriptionRenderer
    }))));
    expect(result).toMatchSnapshot();
  });
  it('renders as expected when passing promise fetchers', function () {
    var fetchItems = jest.fn(function () {
      return Promise.resolve(tasks);
    });
    var fetchTotal = jest.fn(function () {
      return Promise.resolve(tasks.length);
    });
    var result = renderer.render( /*#__PURE__*/_react["default"].createElement(_["default"], {
      caption: "Tasks",
      fetchItems: fetchItems
    }, /*#__PURE__*/_react["default"].createElement(_.Fields, null, /*#__PURE__*/_react["default"].createElement(_.Field, {
      name: "id",
      label: "Id",
      hideInCreateForm: true,
      readOnly: true
    }), /*#__PURE__*/_react["default"].createElement(_.Field, {
      name: "title",
      label: "Title",
      placeholder: "Title"
    }), /*#__PURE__*/_react["default"].createElement(_.Field, {
      name: "description",
      label: "Description",
      render: DescriptionRenderer
    })), /*#__PURE__*/_react["default"].createElement(_.Pagination, {
      itemsPerPage: 2,
      fetchTotalOfItems: fetchTotal
    })));
    expect(result).toMatchSnapshot();
  });
  describe('Behavior', function () {
    var result;
    beforeEach(function () {
      result = (0, _reactTestRenderer.create)( /*#__PURE__*/_react["default"].createElement(_["default"], {
        onChange: onChange,
        caption: "Tasks",
        items: tasks,
        showQueryBuilder: true
      }, /*#__PURE__*/_react["default"].createElement(_.Fields, null, /*#__PURE__*/_react["default"].createElement(_.Field, {
        name: "id",
        label: "Id",
        hideInCreateForm: true,
        readOnly: true
      }), /*#__PURE__*/_react["default"].createElement(_.Field, {
        name: "title",
        label: "Title",
        placeholder: "Title"
      }), /*#__PURE__*/_react["default"].createElement(_.Field, {
        name: "description",
        label: "Description",
        render: DescriptionRenderer
      })), /*#__PURE__*/_react["default"].createElement(_.CreateForm, {
        title: "Task Creation",
        message: "Create a new task!",
        trigger: "Create Task",
        onSubmit: createSubmit,
        submitText: "Create",
        validate: createValidate
      }), /*#__PURE__*/_react["default"].createElement(_.UpdateForm, {
        title: "Task Update Process",
        message: "Update task",
        trigger: "Update",
        onSubmit: updateSubmit,
        submitText: "Update",
        validate: updateValidate
      }), /*#__PURE__*/_react["default"].createElement(_.DeleteForm, {
        title: "Task Delete Process",
        message: "Are you sure you want to delete the task?",
        trigger: "Delete",
        onSubmit: deleteSubmit,
        submitText: "Delete",
        validate: deleteValidate
      }), /*#__PURE__*/_react["default"].createElement(_.Pagination, {
        itemsPerPage: 2,
        totalOfItems: tasks.length
      })));
    });
    it('loads data using promise fetchers', function () {
      var fetchItems = jest.fn(function () {
        return Promise.resolve(tasks);
      });
      var fetchTotal = jest.fn(function () {
        return Promise.resolve(tasks.length);
      });
      var result = (0, _reactTestRenderer.create)( /*#__PURE__*/_react["default"].createElement(_["default"], {
        caption: "Tasks",
        fetchItems: fetchItems,
        onChange: onChange
      }, /*#__PURE__*/_react["default"].createElement(_.Fields, null, /*#__PURE__*/_react["default"].createElement(_.Field, {
        name: "id",
        label: "Id",
        hideInCreateForm: true,
        readOnly: true
      }), /*#__PURE__*/_react["default"].createElement(_.Field, {
        name: "title",
        label: "Title",
        placeholder: "Title"
      }), /*#__PURE__*/_react["default"].createElement(_.Field, {
        name: "description",
        label: "Description",
        render: DescriptionRenderer
      })), /*#__PURE__*/_react["default"].createElement(_.Pagination, {
        itemsPerPage: 2,
        fetchTotalOfItems: fetchTotal
      })));
      expect(fetchItems).toHaveBeenCalledTimes(1);
      expect(fetchTotal).toHaveBeenCalledTimes(1);
    });
    it('handles sort changes', function () {
      var button = result.root.findByType(_Header["default"]);
      button.props.onClick('name', 'descending');
      expect(onChange).toHaveBeenCalledTimes(1);
      expect(onChange).toHaveBeenCalledWith({
        pagination: {
          activePage: 1,
          fields: [],
          itemsPerPage: 2,
          totalOfItems: 2
        },
        queryRules: [],
        sort: {
          direction: 'descending',
          field: 'name'
        }
      });
    });
    it('handles query rules changes', function () {
      var builder = result.root.findByType(_QueryBuilder["default"]);
      var rule = {
        field: 'name',
        condition: 'CONTAINS',
        value: 'John'
      };
      builder.props.onRuleAdded(rule);
      builder.props.onRuleRemoved(rule);
      var base = {
        pagination: {
          activePage: 1,
          fields: [],
          itemsPerPage: 2,
          totalOfItems: 2
        },
        sort: {
          direction: 'descending',
          field: 'id'
        }
      };
      expect(onChange).toHaveBeenCalledTimes(2);
      expect(onChange).toHaveBeenCalledWith(_objectSpread(_objectSpread({}, base), {}, {
        queryRules: [rule]
      }));
      expect(onChange).toHaveBeenCalledWith(_objectSpread(_objectSpread({}, base), {}, {
        queryRules: []
      }));
    });
    it('handles page changes', function () {
      var button = result.root.findByType(_Pagination["default"]);
      button.props.onPageChange(2);
      expect(onChange).toHaveBeenCalledTimes(1);
      expect(onChange).toHaveBeenCalledWith({
        pagination: {
          activePage: 2,
          fields: [],
          itemsPerPage: 2,
          totalOfItems: 2
        },
        queryRules: [],
        sort: {
          direction: 'descending',
          field: 'id'
        }
      });
    });
    it('handles item creation', function () {
      var forms = result.root.findAllByType(_FormModal["default"]);
      var item = {
        name: 'Name'
      };
      forms[0].props.onSubmit(item).then(function () {
        expect(createSubmit).toHaveBeenCalledTimes(1);
        expect(createSubmit).toHaveBeenCalledWith(item);
        expect(onChange).toHaveBeenCalledTimes(1);
        expect(onChange).toHaveBeenCalledWith({
          pagination: {
            activePage: 1,
            fields: [],
            itemsPerPage: 2,
            totalOfItems: 2
          },
          queryRules: [],
          sort: {
            direction: 'descending',
            field: 'id'
          }
        });
      });
    });
    it('handles item update', function () {
      var forms = result.root.findAllByType(_FormModal["default"]);
      var item = {
        name: 'Name'
      };
      forms[1].props.onSubmit(item).then(function () {
        expect(updateSubmit).toHaveBeenCalledTimes(1);
        expect(updateSubmit).toHaveBeenCalledWith(item);
        expect(onChange).toHaveBeenCalledTimes(1);
        expect(onChange).toHaveBeenCalledWith({
          pagination: {
            activePage: 1,
            fields: [],
            itemsPerPage: 2,
            totalOfItems: 2
          },
          queryRules: [],
          sort: {
            direction: 'descending',
            field: 'id'
          }
        });
      });
    });
    it('handles item delete', function () {
      var forms = result.root.findAllByType(_FormModal["default"]);
      var item = {
        name: 'Name'
      };
      forms[2].props.onSubmit(item).then(function () {
        expect(deleteSubmit).toHaveBeenCalledTimes(1);
        expect(deleteSubmit).toHaveBeenCalledWith(item);
        expect(onChange).toHaveBeenCalledTimes(1);
        expect(onChange).toHaveBeenCalledWith({
          pagination: {
            activePage: 1,
            fields: [],
            itemsPerPage: 2,
            totalOfItems: 2
          },
          queryRules: [],
          sort: {
            direction: 'descending',
            field: 'id'
          }
        });
      });
    });
    it('handles create form visibility change', function () {
      var forms = result.root.findAllByType(_FormModal["default"]);
      forms[0].props.onVisibilityChange(true);
      expect(result.root.instance.state.createModalVisible).toEqual(true);
    });
    it('handles update form visibility change', function () {
      var forms = result.root.findAllByType(_FormModal["default"]);
      forms[1].props.onVisibilityChange(true);
      expect(result.root.instance.state.updateModalVisible).toEqual(true);
    });
    it('handles delete form visibility change', function () {
      var forms = result.root.findAllByType(_FormModal["default"]);
      forms[2].props.onVisibilityChange(true);
      expect(result.root.instance.state.deleteModalVisible).toEqual(true);
    });
    it('handles update modal trigger process', function () {
      var item = {
        id: 1,
        name: 'Test'
      };
      var body = result.root.findByType(_Body["default"]);
      body.props.onUpdateClick(item);
      expect(result.root.instance.state.updateModalVisible).toEqual(true);
      expect(result.root.instance.state.updateItem).toEqual(item);
    });
    it('handles delete modal trigger process', function () {
      var item = {
        id: 1,
        name: 'Test'
      };
      var body = result.root.findByType(_Body["default"]);
      body.props.onDeleteClick(item);
      expect(result.root.instance.state.deleteModalVisible).toEqual(true);
      expect(result.root.instance.state.deleteItem).toEqual(item);
    });
  });
});