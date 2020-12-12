// @flow
import React from 'react';

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
import { NO_OP } from '../helpers';

type Props = {
  onChange?: Function,
  actionsLabel?: number | string | React.Element | Array<any>,
  showQueryBuilder?: boolean,
  items?: Object,
  caption?: number | string | React.Element | Array<any>,
  fetchItems?: Function,
  children: number | string | React.Element | Array<any>,
};

class CRUDTable extends React.Component {
  constructor(props: Props) {
    super(props);

    this.handleOnCreateSubmission = this.handleOnCreateSubmission.bind(this);
    this.handleOnDeleteSubmission = this.handleOnDeleteSubmission.bind(this);
    this.handleOnUpdateSubmission = this.handleOnUpdateSubmission.bind(this);
    this.handleHeaderClick = this.handleHeaderClick.bind(this);
    this.handlePageChange = this.handlePageChange.bind(this);
    this.handleRuleAdded = this.handleRuleAdded.bind(this);
    this.handleRuleRemoved = this.handleRuleRemoved.bind(this);

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
        activePage:
          this.pagination.activePage || this.pagination.defaultActivePage || 1,
        totalOfItems: this.pagination.totalOfItems || 0,
        itemsPerPage: this.pagination.itemsPerPage || 10,
      },
      totalOfItems: this.pagination.totalOfItems || 0,
    };
  }

  props: Props;

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

  handlePageChange(activePage) {
    const pagination = {
      ...this.state.pagination,
      activePage,
    };
    this.setState({ pagination });
    this.update({ pagination });
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

  handleRuleAdded(rule) {
    const { queryRules } = this.state;
    const newQueryRules = [...queryRules, rule];
    this.setState({ queryRules: newQueryRules });
    this.update({ queryRules: newQueryRules });
  }

  handleRuleRemoved(rule) {
    const { queryRules } = this.state;
    const newQueryRules = queryRules.filter(
      (x) => x.field !== rule.field || x.condition !== rule.condition
    );
    this.setState({ queryRules: newQueryRules });
    this.update({ queryRules: newQueryRules });
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
      queryRules,
      createModalVisible,
      deleteModalVisible,
      updateModalVisible,
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
            visible={createModalVisible}
            onVisibilityChange={(visible) => {
              this.setState({
                createModalVisible: visible,
              });
            }}
          />
        )}

        <Table.Caption>{caption}</Table.Caption>

        {showQueryBuilder && (
          <QueryBuilder
            queryRules={queryRules}
            fields={this.queryFields}
            onRuleAdded={this.handleRuleAdded}
            onRuleRemoved={this.handleRuleRemoved}
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
              this.setState({
                deleteItem: item,
                deleteModalVisible: true,
              });
            }}
            onUpdateClick={(item) => {
              this.setState({
                updateItem: item,
                updateModalVisible: true,
              });
            }}
          />
        </Table>

        {!!pagination && totalOfItems > 0 && (
          <PaginationCpt
            {...pagination}
            totalOfItems={totalOfItems}
            onPageChange={this.handlePageChange}
          />
        )}

        {this.forms.update && (
          <FormModal
            initialValues={updateItem}
            data={this.forms.update}
            onSubmit={this.handleOnUpdateSubmission}
            visible={updateModalVisible}
            onVisibilityChange={(visible) => {
              this.setState({
                updateModalVisible: visible,
              });
            }}
          />
        )}

        {this.forms.delete && (
          <FormModal
            initialValues={deleteItem}
            data={this.forms.delete}
            onSubmit={this.handleOnDeleteSubmission}
            visible={deleteModalVisible}
            onVisibilityChange={(visible) => {
              this.setState({
                deleteModalVisible: visible,
              });
            }}
          />
        )}
      </div>
    );
  }
}

CRUDTable.defaultProps = {
  onChange: NO_OP,
  actionsLabel: 'Actions',
  showQueryBuilder: false,
  items: [],
  caption: null,
  fetchItems: null,
};

export const Fields = () => <div />;
Fields.displayName = FIELDS_COMPONENT_TYPE;

export type FieldProps = {
  name: string,
  label: string,
  type?: string,
  tableValueResolver?: Function | string,
  hideInCreateForm?: boolean,
  hideInUpdateForm?: boolean,
  hideFromTable?: boolean,
  queryable?: boolean,
  sortable?: boolean,
};

export const Field = (props: FieldProps) => {
  const {
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
  } = props;

  return <div />;
};
Field.displayName = FIELD_COMPONENT_TYPE;
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
