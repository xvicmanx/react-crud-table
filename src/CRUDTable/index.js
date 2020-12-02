import React from "react";
import PropTypes from 'prop-types';
import { Table } from "./wrappers";
import Header from "./Header";
import Body from "./Body";
import PaginationCpt from '../Pagination';
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
  FILTER_BY_TYPE,
  extractFields,
  extractPagination,
  getProps,
  extractForms,
  extractQueryFields
} from "./helpers";
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

    const items = React.Children.toArray(props.children);
    this.fields = extractFields(items);
    this.forms = extractForms(items, this.fields);
    this.pagination = extractPagination(items);
    this.queryFields = extractQueryFields(items);

    this.state = {
      items: props.values || [],
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

  update(data, reportChange = true) {
    const payload = this.getPayload(data);
    if (this.props.fetchItems) {
      this.props
      .fetchItems(payload)
      .then(items => {
        this.setState({ items });
      });
    }

    if (this.pagination.fetchTotalOfItems) {
      this.pagination.fetchTotalOfItems(payload)
      .then(totalOfItems => {
        this.setState({ totalOfItems });
      });
    }

    if (reportChange) {
      this.props.onChange(payload);
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.items !== this.props.items) {
      this.setState({ items: nextProps.items });
    }

    if (nextProps.totalOfItems !== this.props.totalOfItems) {
      this.setState({ totalOfItems: nextProps.totalOfItems });
    }
  }
  

  handleHeaderClick(field, direction) {
    const sort = {
      field,
      direction: toggleDirection(
        direction,
        field === this.state.sort.field
      ),
    };
    this.setState({ sort });
    this.update({ sort });
  }

  getPayload(extension = {}) {
    return Object.assign(
      {
        queryRules: this.state.queryRules,
        pagination: this.state.pagination,
        sort: this.state.sort,
      },
      extension
    );
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
    return this.forms.create.onSubmit(values)
      .then((result) => {
        this.update();
        return result;
      });
  }

  handleOnUpdateSubmission(values) {
    return this.forms.update.onSubmit(values)
      .then((result) => {
        this.update();
        return result;
      });
  }

  handleOnDeleteSubmission(values) {
    return this.forms.delete.onSubmit(values)
      .then((result) => {
        this.update();
        return result;
      });
  }

  render() {
    const { items, sort, pagination } = this.state;
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

        <Table.Caption>{this.props.caption}</Table.Caption>
        
        {this.props.showQueryBuilder && (
          <QueryBuilder
            fields={this.queryFields}
            onChange={this.handleQueryChange}
          />
        )}

        <Table>
          <Header
            fields={this.fields}
            sort={sort}
            onClick={this.handleHeaderClick}
            forms={this.forms}
            actionsLabel={this.props.actionsLabel}
          />
          <Body
            fields={this.fields}
            items={items}
            forms={this.forms}
            actionsLabel={this.props.actionsLabel}
            onDeleteClick={(deleteItem) => {
              this.setState({ deleteItem });
              this.deleteModalController.show();
            }}
            onUpdateClick={(updateItem) => {
              this.setState({ updateItem });
              this.updateModalController.show();
            }}
          />
        </Table>

        {!!pagination &&
          (!!this.state.totalOfItems) &&
          (
            <PaginationCpt
              {...pagination}
              totalOfItems={this.state.totalOfItems}
              onChange={this.handlePaginationChange}
            />
        )}
        
        {this.forms.update && (
          <FormModal
            initialValues={this.state.updateItem}
            data={this.forms.update}
            onSubmit={this.handleOnUpdateSubmission}
            onInit={(controller) => {
              this.updateModalController = controller;
            }}
          />
        )}
  
        {this.forms.delete && (
          <FormModal
            initialValues={this.state.deleteItem}
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
};

export const Fields = () => <div />;
Fields.displayName = FIELDS_COMPONENT_TYPE;

export const Field = ({
  name,
  label,
  tableValueResolver,
  hideInCreateForm,
  hideInUpdateForm,
  queryable,
  type,
}) => <div {...props} />;
Field.displayName = FIELD_COMPONENT_TYPE;
Field.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  type: PropTypes.string,
  tableValueResolver: PropTypes.any,
  hideInCreateForm: PropTypes.bool,
  hideInUpdateForm: PropTypes.bool,
  queryable: PropTypes.bool,
  sortable: PropTypes.bool,
};
Field.defaultProps = {
  queryable: true,
  sortable: true,
  type: 'text',
  hideInCreateForm: false,
  hideInUpdateForm: false,
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
