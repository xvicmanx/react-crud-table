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
    this.update(this.state.sort);
  }

  update(sort) {
    if (this.props.config.readValues) {
      this.props.config
      .readValues({ sort })
      .then(items => {
        this.setState({ items });
      });
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.values !== this.props.values) {
      this.setState({ items: nextProps.values });
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
      .update.onSubmit(values)
      .then(() => {
        this.update(this.state.sort);
      });
  }

  render() {
    const { fields, forms } = this.props.config;
    const { items, sort } = this.state;
    return (
      <div>
        <Table>
          <Table.Caption>
            <FormModal
              trigger={forms.create.trigger}
              data={forms.create}
              onSubmit={this.handleOnCreateSubmission}
            />
          </Table.Caption>
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
        <FormModal
          initialValues={this.state.updateItem}
          data={forms.update}
          onSubmit={this.handleOnUpdateSubmission}
          onInit={(controller) => {
            this.updateModalController = controller;
          }}
        />
        <FormModal
          initialValues={this.state.deleteItem}
          data={forms.delete}
          onSubmit={this.handleOnDeleteSubmission}
          onInit={(controller) => {
            this.deleteModalController = controller;
          }}
        />
      </div>
    );
  }
}

export default SmartTable;
