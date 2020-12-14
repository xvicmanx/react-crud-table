// @flow
import * as React from 'react';

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
  getDefaultState,
} from './helpers';
import { Table } from './wrappers';
import Header from './Header';
import Body from './Body';
import PaginationCpt from '../Pagination';
import FormModal from '../FormModal';
import QueryBuilder from '../QueryBuilder';
import { NO_OP } from '../helpers';
import { addRule, changePage, changeSort, removeRule } from './actions';

type Props = {
  onChange?: Function,
  actionsLabel?: number | string | React.Element<any> | Array<any>,
  showQueryBuilder?: boolean,
  items?: Object,
  caption?: number | string | React.Element<any> | Array<any>,
  fetchItems?: Function,
  children: number | string | React.Element<any> | Array<any>,
};

type State = {
  queryRules: Array<Object>,
  updateItem: ?Object,
  deleteItem: ?Object,
  createModalVisible: boolean,
  deleteModalVisible: boolean,
  updateModalVisible: boolean,
  items?: Array<Object>,
  sort: Object,
  pagination: Object,
  totalOfItems: number,
};

class CRUDTable extends React.Component<Props, State> {
  forms: Object;
  queryFields: Array<Object>;
  pagination: Object;
  fields: Array<Object>;

  constructor(props: Props) {
    super(props);

    const target: any = this;
    target.handleOnCreateSubmission = this.handleOnCreateSubmission.bind(this);
    target.handleOnDeleteSubmission = this.handleOnDeleteSubmission.bind(this);
    target.handleOnUpdateSubmission = this.handleOnUpdateSubmission.bind(this);
    target.handleSortChange = this.handleSortChange.bind(this);
    target.handlePageChange = this.handlePageChange.bind(this);
    target.handleRuleAdded = this.handleRuleAdded.bind(this);
    target.handleRuleRemoved = this.handleRuleRemoved.bind(this);

    const configItems = React.Children.toArray(props.children);
    this.fields = extractFields(configItems);
    this.forms = extractForms(configItems, this.fields);
    this.pagination = extractPagination(configItems);
    this.queryFields = extractQueryFields(configItems);
    this.state = getDefaultState(props.items, this.pagination);
  }

  props: Props;

  componentDidMount() {
    this.update(undefined, false);
  }

  // eslint-disable-next-line camelcase
  UNSAFE_componentWillReceiveProps(nextProps: Props) {
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

  handleSortChange(field: string, direction: string) {
    this.setState(changeSort(field, direction), () => {
      const { sort } = this.state;
      this.update({ sort });
    });
  }

  handlePageChange(activePage: number) {
    this.setState(changePage(activePage), () => {
      const { pagination } = this.state;
      this.update({ pagination });
    });
  }

  handleOnCreateSubmission(values: Object): any {
    return this.formSubmission(this.forms.create, values);
  }

  handleOnUpdateSubmission(values: Object): any {
    return this.formSubmission(this.forms.update, values);
  }

  handleOnDeleteSubmission(values: Object): any {
    return this.formSubmission(this.forms.delete, values);
  }

  formSubmission(form: Object, values: Object): any {
    return form.onSubmit(values).then((result) => {
      this.update();
      return result;
    });
  }

  handleRuleAdded(rule: Object) {
    this.setState(addRule(rule), () => {
      const { queryRules } = this.state;
      this.update({ queryRules });
    });
  }

  handleRuleRemoved(rule: Object) {
    this.setState(removeRule(rule), () => {
      const { queryRules } = this.state;
      this.update({ queryRules });
    });
  }

  getPayload(extension: Object = {}): Object {
    const { queryRules, pagination, sort } = this.state;
    return {
      queryRules,
      pagination,
      sort,
      ...extension,
    };
  }

  update(data: Object = undefined, reportChange: Object = true) {
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

  render(): React$Element<any> {
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
            onClick={this.handleSortChange}
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
            trigger={null}
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

// $FlowFixMe
CRUDTable.defaultProps = {
  onChange: NO_OP,
  actionsLabel: 'Actions',
  showQueryBuilder: false,
  items: [],
  caption: null,
  fetchItems: null,
};

export const Fields = (): React$Element<any> => <div />;
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

export const Field = (props: FieldProps): React$Element<any> => {
  const {
    name,
    label,
    tableValueResolver,
    hideInCreateForm,
    hideInUpdateForm,
    hideFromTable,
    queryable,
    type,
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

export const CreateForm = (): React$Element<any> => <div />;
CreateForm.displayName = CREATE_FORM_COMPONENT_TYPE;

export const UpdateForm = (): React$Element<any> => <div />;
UpdateForm.displayName = UPDATE_FORM_COMPONENT_TYPE;

export const DeleteForm = (): React$Element<any> => <div />;
DeleteForm.displayName = DELETE_FORM_COMPONENT_TYPE;

export const Pagination = (): React$Element<any> => <div />;
Pagination.displayName = PAGINATION_COMPONENT_TYPE;

export default CRUDTable;
