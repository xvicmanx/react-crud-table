import React from "react";
import PropTypes from 'prop-types';
import { Table } from "./wrappers";
import Header from "./Header";
import Body from "./Body";
import { SORT_DIRECTIONS, ID_FIELD } from './constants';
import { toggleDirection } from "./helpers";
import FormModal from '../FormModal';


const FIELDS_COMPONENT_TYPE = 'CRUDTable_Fields';
const FIELD_COMPONENT_TYPE = 'CRUDTable_Field';
const CREATE_FORM_COMPONENT_TYPE = 'CRUDTable_CreateForm';
const DELETE_FORM_COMPONENT_TYPE = 'CRUDTable_DeleteForm';
const UPDATE_FORM_COMPONENT_TYPE = 'CRUDTable_UpdateForm';

const FILTER_BY_TYPE = t => item => item.type && item.type.displayName === t;

const extractFields = (items) => {
  const container = items.find(FILTER_BY_TYPE(FIELDS_COMPONENT_TYPE));
  const children = container ? 
    React.Children.toArray(container.props.children): [];
  return children
    .filter(FILTER_BY_TYPE(FIELD_COMPONENT_TYPE))
    .map(c => c.props);
};

const getProps = (comp, fields = []) => {
  const props = comp ? comp.props : null;
  if (!props) return props;
  return Object.assign(
    {},
    props,
    {
      fields,
    }
  );
};

const extractForms = (items, fields) => ({
  create: getProps(
    items.find(FILTER_BY_TYPE(CREATE_FORM_COMPONENT_TYPE)),
    fields.filter(f => !f.hideInCreateForm),
  ),
  update: getProps(
    items.find(FILTER_BY_TYPE(UPDATE_FORM_COMPONENT_TYPE)),
    fields.filter(f => !f.hideInUpdateForm),
  ),
  delete: getProps(items.find(FILTER_BY_TYPE(DELETE_FORM_COMPONENT_TYPE))),
});


class CRUDTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: props.values || [],
      sort: {
        field: ID_FIELD,
        direction: SORT_DIRECTIONS.DESCENDING,
      },
      updateItem: {},
      deleteItem: {},
    };
    this.updateModalController = null;
    this.deleteModalController = null;
    this.handleOnCreateSubmission = this.handleOnCreateSubmission.bind(this);
    this.handleOnDeleteSubmission = this.handleOnDeleteSubmission.bind(this);
    this.handleOnUpdateSubmission = this.handleOnUpdateSubmission.bind(this);
    this.handleHeaderClick = this.handleHeaderClick.bind(this);

    const items = React.Children.toArray(props.children);
    this.fields = extractFields(items);
    this.forms = extractForms(items, this.fields);
  }

  componentDidMount() {
    this.update(this.state.sort, false);
  }

  update(sort, reportChange = true) {
    if (this.props.fetchItems) {
      this.props
      .fetchItems({ sort })
      .then(items => {
        this.setState({ items });
      });
    }

    if (reportChange) {
      this.props.onChange({ sort });
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.items !== this.props.items) {
      this.setState({ items: nextProps.items });
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
    this.update(sort);
  }

  handleOnCreateSubmission(values) {
    this.forms.create.onSubmit(values)
      .then(() => {
        this.update(this.state.sort);
      });
  }

  handleOnUpdateSubmission(values) {
    this.forms.update.onSubmit(values)
      .then(() => {
        this.update(this.state.sort);
      });
  }

  handleOnDeleteSubmission(values) {
    this.forms.delete.onSubmit(values)
      .then(() => {
        this.update(this.state.sort);
      });
  }

  render() {
    const { items, sort } = this.state;
    return (
      <div>
        {this.forms.create && (
          <FormModal
            trigger={this.forms.create.trigger}
            data={this.forms.create}
            onSubmit={this.handleOnCreateSubmission}
          />
        )}
        <Table>
          <Table.Caption>{this.props.caption}</Table.Caption>
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
};

export const Fields = () => <div />;
Fields.displayName = FIELDS_COMPONENT_TYPE;

export const Field = ({
  name,
  label,
  tableValueResolver,
  hideInCreateForm,
  hideInUpdateForm,
}) => <div {...props} />;
Field.displayName = FIELD_COMPONENT_TYPE;
Field.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  tableValueResolver: PropTypes.any,
  hideInCreateForm: PropTypes.bool,
  hideInUpdateForm: PropTypes.bool,
};

export const CreateForm = () => <div />;
CreateForm.displayName = CREATE_FORM_COMPONENT_TYPE;

export const UpdateForm = () => <div />;
UpdateForm.displayName = UPDATE_FORM_COMPONENT_TYPE;

export const DeleteForm = () => <div />;
DeleteForm.displayName = DELETE_FORM_COMPONENT_TYPE;

export default CRUDTable;
