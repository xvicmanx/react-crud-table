import React from 'react';
import PropTypes from 'prop-types';

import {
  SORT_DIRECTIONS,
  ID_FIELD,
  FIELDS_COMPONENT_TYPE,
  FIELD_COMPONENT_TYPE,
  CREATE_FORM_COMPONENT_TYPE,
  DELETE_FORM_COMPONENT_TYPE,
  UPDATE_FORM_COMPONENT_TYPE,
  PAGINATION_COMPONENT_TYPE,
} from './constants';
import {
  toggleDirection,
  extractFields,
  extractPagination,
  extractForms,
  extractQueryFields,
  queryValue,
  getPaginationProps,
} from './helpers';
import { Table } from './wrappers';
import Header from './Header';
import Body from './Body';
import PaginationCpt from '../Pagination';
import FormModal from '../FormModal';
import QueryBuilder from '../QueryBuilder';

class CRUDTable extends React.Component {
  constructor(props) {
    super(props);

    this.updateModalController = null;
    this.deleteModalController = null;
    this.handleOnCreateSubmission = this.handleOnCreateSubmission.bind(this);
    this.handleOnDeleteSubmission = this.handleOnDeleteSubmission.bind(this);
    this.handleOnUpdateSubmission = this.handleOnUpdateSubmission.bind(this);
    this.handleHeaderClick = this.handleHeaderClick.bind(this);
    this.handlePaginationChange = this.handlePaginationChange.bind(this);
    this.handleQueryChange = this.handleQueryChange.bind(this);

    const configItems = React.Children.toArray(props.children);
    this.fields = extractFields(configItems);
    this.forms = extractForms(configItems, this.fields);
    this.pagination = extractPagination(configItems);
    this.queryFields = extractQueryFields(configItems);

    this.state = {
      items: props.items,
      sort: {
        field: ID_FIELD,
        direction: SORT_DIRECTIONS.DESCENDING,
      },
      queryRules: [],
      updateItem: {},
      deleteItem: {},
      pagination: {
        ...this.pagination,
        activePage: this.pagination.activePage || 1,
      },
      totalOfItems: this.pagination.totalOfItems || 0,
    };
  }

  componentDidMount() {
    this.update(undefined, false);
  }

  // eslint-disable-next-line camelcase
  UNSAFE_componentWillReceiveProps(nextProps) {
    const { items } = this.props;
    const newState = {};

    if (nextProps.items !== items) {
      newState.items = nextProps.items;
      const paginationProps = getPaginationProps(nextProps);
      newState.totalOfItems = paginationProps.totalOfItems || 0;
    }

    if (Object.keys(newState).length) {
      this.setState(newState);
    }
  }

  handleHeaderClick(field, direction) {
    const { sort } = this.state;
    const newSort = {
      field,
      direction: toggleDirection(direction, field === sort.field),
    };
    this.setState({ sort: newSort });
    this.update({ sort: newSort });
  }

  handlePaginationChange(pagination) {
    this.setState({ pagination });
    this.update({ pagination });
  }

  handleQueryChange(queryRules) {
    this.setState({ queryRules });
    this.update({ queryRules });
  }

  handleOnCreateSubmission(values) {
    return this.forms.create.onSubmit(values).then((result) => {
      this.update();
      return result;
    });
  }

  handleOnUpdateSubmission(values) {
    return this.forms.update.onSubmit(values).then((result) => {
      this.update();
      return result;
    });
  }

  handleOnDeleteSubmission(values) {
    return this.forms.delete.onSubmit(values).then((result) => {
      this.update();
      return result;
    });
  }

  getPayload(extension = {}) {
    const { queryRules, pagination, sort } = this.state;
    return {
      queryRules,
      pagination,
      sort,
      ...extension,
    };
  }

  update(data, reportChange = true) {
    const { fetchItems, onChange } = this.props;
    const payload = this.getPayload(data);

    if (fetchItems) {
      fetchItems(payload).then((items) => {
        this.setState({ items });
      });
    }

    if (this.pagination.fetchTotalOfItems) {
      this.pagination.fetchTotalOfItems(payload).then((totalOfItems) => {
        this.setState({ totalOfItems });
      });
    }

    if (reportChange) {
      onChange(payload);
    }
  }

  render() {
    const {
      items,
      sort,
      pagination,
      totalOfItems,
      deleteItem,
      updateItem,
    } = this.state;
    const { caption, showQueryBuilder, actionsLabel } = this.props;
    const tabularFields = this.fields.filter((f) => !f.hideFromTable);
    const updateTrigger = queryValue(this.forms, 'update.trigger');
    const deleteTrigger = queryValue(this.forms, 'delete.trigger');
    return (
      <div>
        {this.forms.create && (
          <FormModal
            trigger={this.forms.create.trigger}
            data={this.forms.create}
            onSubmit={this.handleOnCreateSubmission}
            shouldReset
          />
        )}

        <Table.Caption>{caption}</Table.Caption>

        {showQueryBuilder && (
          <QueryBuilder
            fields={this.queryFields}
            onChange={this.handleQueryChange}
          />
        )}

        <Table>
          <Header
            fields={tabularFields}
            sort={sort}
            onClick={this.handleHeaderClick}
            actionsLabel={updateTrigger || deleteTrigger ? actionsLabel : ''}
          />
          <Body
            fields={tabularFields}
            items={items}
            updateTrigger={updateTrigger}
            deleteTrigger={deleteTrigger}
            actionsLabel={actionsLabel}
            onDeleteClick={(item) => {
              this.setState({ deleteItem: item });
              this.deleteModalController.show();
            }}
            onUpdateClick={(item) => {
              this.setState({ updateItem: item });
              this.updateModalController.show();
            }}
          />
        </Table>

        {!!pagination && totalOfItems > 0 && (
          <PaginationCpt
            {...pagination}
            totalOfItems={totalOfItems}
            onChange={this.handlePaginationChange}
          />
        )}

        {this.forms.update && (
          <FormModal
            initialValues={updateItem}
            data={this.forms.update}
            onSubmit={this.handleOnUpdateSubmission}
            onInit={(controller) => {
              this.updateModalController = controller;
            }}
          />
        )}

        {this.forms.delete && (
          <FormModal
            initialValues={deleteItem}
            data={this.forms.delete}
            onSubmit={this.handleOnDeleteSubmission}
            onInit={(controller) => {
              this.deleteModalController = controller;
            }}
          />
        )}
      </div>
    );
  }
}

CRUDTable.defaultProps = {
  onChange: () => {},
  actionsLabel: 'Actions',
  showQueryBuilder: false,
  items: [],
  caption: null,
  fetchItems: null,
};

CRUDTable.propTypes = {
  onChange: PropTypes.func,
  actionsLabel: PropTypes.node,
  showQueryBuilder: PropTypes.bool,
  items: PropTypes.instanceOf(Object),
  caption: PropTypes.node,
  fetchItems: PropTypes.func,
  children: PropTypes.oneOf([PropTypes.node, PropTypes.arrayOf(PropTypes.node)])
    .isRequired,
};

export const Fields = () => <div />;
Fields.displayName = FIELDS_COMPONENT_TYPE;

export const Field = ({
  // eslint-disable-next-line no-unused-vars
  name,
  // eslint-disable-next-line no-unused-vars
  label,
  // eslint-disable-next-line no-unused-vars
  tableValueResolver,
  // eslint-disable-next-line no-unused-vars
  hideInCreateForm,
  // eslint-disable-next-line no-unused-vars
  hideInUpdateForm,
  // eslint-disable-next-line no-unused-vars
  hideFromTable,
  // eslint-disable-next-line no-unused-vars
  queryable,
  // eslint-disable-next-line no-unused-vars
  type,
  // eslint-disable-next-line no-unused-vars
  sortable,
}) => <div />;
Field.displayName = FIELD_COMPONENT_TYPE;
Field.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  type: PropTypes.string,
  tableValueResolver: PropTypes.oneOf([PropTypes.func, PropTypes.string]),
  hideInCreateForm: PropTypes.bool,
  hideInUpdateForm: PropTypes.bool,
  hideFromTable: PropTypes.bool,
  queryable: PropTypes.bool,
  sortable: PropTypes.bool,
};
Field.defaultProps = {
  queryable: true,
  sortable: true,
  type: 'text',
  hideInCreateForm: false,
  hideInUpdateForm: false,
  hideFromTable: false,
  tableValueResolver: null,
};

export const CreateForm = () => <div />;
CreateForm.displayName = CREATE_FORM_COMPONENT_TYPE;

export const UpdateForm = () => <div />;
UpdateForm.displayName = UPDATE_FORM_COMPONENT_TYPE;

export const DeleteForm = () => <div />;
DeleteForm.displayName = DELETE_FORM_COMPONENT_TYPE;

export const Pagination = () => <div />;
Pagination.displayName = PAGINATION_COMPONENT_TYPE;

export default CRUDTable;
