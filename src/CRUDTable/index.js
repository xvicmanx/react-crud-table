import React from "react";
import { Table } from "./wrappers";
import Header from "./Header";
import Body from "./Body";
import { SORT_DIRECTIONS, ID_FIELD } from './constants';
import { toggleDirection } from "./helpers";
import FormModal from '../FormModal';

class SmartTable extends React.Component {
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
  }

  componentDidMount() {
    this.update(this.state.sort, false);
  }

  update(sort, reportChange = true) {
    if (this.props.config.fetchItems) {
      this.props.config
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
    this.props.config.forms
      .create.onSubmit(values)
      .then(() => {
        this.update(this.state.sort);
      });
  }

  handleOnUpdateSubmission(values) {
    this.props.config.forms
      .update.onSubmit(values)
      .then(() => {
        this.update(this.state.sort);
      });
  }

  handleOnDeleteSubmission(values) {
    this.props.config.forms
      .delete.onSubmit(values)
      .then(() => {
        this.update(this.state.sort);
      });
  }

  render() {
    const { fields, forms } = this.props.config;
    const { items, sort } = this.state;
    return (
      <div>
        {forms && forms.create && (
          <FormModal
            trigger={forms.create.trigger}
            data={forms.create}
            onSubmit={this.handleOnCreateSubmission}
          />
        )}
        <Table>
          <Table.Caption>{this.props.caption}</Table.Caption>
          <Header
            fields={fields}
            sort={sort}
            onClick={this.handleHeaderClick}
            forms={forms}
          />
          <Body
            fields={fields}
            items={items}
            forms={forms}
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
        {forms && forms.update && (
          <FormModal
            initialValues={this.state.updateItem}
            data={forms.update}
            onSubmit={this.handleOnUpdateSubmission}
            onInit={(controller) => {
              this.updateModalController = controller;
            }}
          />
        )}
        {forms && forms.delete && (
          <FormModal
            initialValues={this.state.deleteItem}
            data={forms.delete}
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

SmartTable.defaultProps = {
  onChange: () => {},
};

export default SmartTable;
