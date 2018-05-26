import React from "react";
import { render } from "react-dom";
import CRUDTable from "./CRUDTable";
import plus from './assets/plus.svg';
import './index.css';

const styles = {
  fontFamily: "sans-serif",
  textAlign: "center"
};

const renderer = ({ field }) => (
  <input {...field} />
);

const fields = [
  {
    name: "id",
    label: <span style={{ marginLeft: "3px" }}>ID</span>,
    render: renderer,
  },
  {
    name: "name",
    label: "Nombre",
    placeholder: 'Nombre',
    render: renderer,
  },
  {
    name: "description",
    label: "Descripcion",
    render: renderer,
    tableValueResolver: 'description'
  }
];

const items = [
  {
    id: 1,
    name: "test",
    description: "wepa"
  },
  {
    id: 2,
    name: "foo",
    description: "Foo"
  },
  {
    id: 3,
    name: "bar",
    description: "Bar"
  },
  {
    id: 4,
    name: "FR",
    description: "FR"
  },
  {
    id: 1,
    name: "test",
    description: "wepa"
  },
  {
    id: 2,
    name: "foo",
    description: "Foo"
  },
  {
    id: 3,
    name: "bar",
    description: "Bar"
  },
  {
    id: 4,
    name: "FR",
    description: "FR"
  },
  {
    id: 1,
    name: "test",
    description: "wepa"
  },
  {
    id: 2,
    name: "foo",
    description: "Foo"
  },
  {
    id: 3,
    name: "bar",
    description: "Bar"
  },
  {
    id: 4,
    name: "FR",
    description: "FR"
  }
];

const config = {
  forms: {
    create: {
      message: "Create a new Item",
      trigger: "Create",
      fields: fields.filter(f => f.name !== 'id'),
      onSubmit(item) {
        items.push(item);
        return Promise.resolve(true);
      },
      submitText: "Create",
      validate: values => {
        let errors = {};
        if (!values.name) {
          errors.name = 'Please Insert name';
        }
        return errors;
      }
    },
    update: {
      message: "Update the item",
      trigger: "Update",
      fields,
      onSubmit(item) {
        return Promise.resolve(true);
      },
      submitText: "Update",
      submitButtonProps: {
        modifiers: 'primary',
      },
      validate: values => {
        let errors = {};
        if (!values.id) {
          errors.id = 'Please Insert id';
        }
        if (!values.name) {
          errors.name = 'Please Insert name';
        }
        return errors;
      }
    },
    delete: {
      message: "Are you sure you want to remove the item?",
      trigger: "Delete",
      fields: [],
      onSubmit(item) {
        return Promise.resolve(true);
      },
      submitText: "Delete",
      submitButtonProps: {
        modifiers: 'negative',
      },
      validate: values => {
        let errors = {};
        if (!values.id) {
          errors.id = 'Please Insert id';
        }
        return errors;
      }
    }
  },
  fields,
  readValues: ({ sort }) => {
    let result = items;
    const sorters = {
      descending: (a, b) => {
        return b[sort.field] - a[sort.field];
      },
      ascending: (a, b) => {
        return a[sort.field] - b[sort.field];
      }
    };
    result = result.sort(sorters[sort.direction]);
    return Promise.resolve(result);
  }
};

class App extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div style={styles}>
        <SmartTable config={config} />
      </div>
    )
  }
}
render(<App />, document.getElementById("root"));
