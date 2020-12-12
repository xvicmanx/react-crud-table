import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import { create } from 'react-test-renderer';

import CRUDTable, {
  Fields,
  Field,
  CreateForm,
  UpdateForm,
  DeleteForm,
  Pagination,
} from '.';

import Header from './Header';
import Body from './Body';
import PaginationCpt from '../Pagination';
import FormModal from '../FormModal';
import QueryBuilder from '../QueryBuilder';

// eslint-disable-next-line react/prop-types
const DescriptionRenderer = ({ field }) => <textarea {...field} />;

const renderer = new ShallowRenderer();

describe('CRUDTable', () => {
  let tasks;
  let createValidate;
  let updateValidate;
  let deleteValidate;
  let createSubmit;
  let updateSubmit;
  let deleteSubmit;
  let onChange;

  beforeEach(() => {
    tasks = [
      {
        id: 1,
        title: 'Create an example',
        description: 'Create an example of how to use the component',
      },
      {
        id: 2,
        title: 'Improve',
        description: 'Improve the component!',
      },
    ];
    createValidate = jest.fn();
    updateValidate = jest.fn();
    deleteValidate = jest.fn();
    createSubmit = jest.fn(() => Promise.resolve({ success: true }));
    updateSubmit = jest.fn(() => Promise.resolve({ success: true }));
    deleteSubmit = jest.fn(() => Promise.resolve({ success: true }));
    onChange = jest.fn();
  });

  it('renders as expected with forms, query builder, and pagination', () => {
    const result = renderer.render(
      <CRUDTable caption="Tasks" items={tasks} showQueryBuilder>
        <Fields>
          <Field name="id" label="Id" hideInCreateForm readOnly />
          <Field name="title" label="Title" placeholder="Title" />
          <Field
            name="description"
            label="Description"
            render={DescriptionRenderer}
          />
        </Fields>
        <CreateForm
          title="Task Creation"
          message="Create a new task!"
          trigger="Create Task"
          onSubmit={createSubmit}
          submitText="Create"
          validate={createValidate}
        />

        <UpdateForm
          title="Task Update Process"
          message="Update task"
          trigger="Update"
          onSubmit={updateSubmit}
          submitText="Update"
          validate={updateValidate}
        />

        <DeleteForm
          title="Task Delete Process"
          message="Are you sure you want to delete the task?"
          trigger="Delete"
          onSubmit={deleteSubmit}
          submitText="Delete"
          validate={deleteValidate}
        />
        <Pagination itemsPerPage={2} totalOfItems={tasks.length} />
      </CRUDTable>
    );
    expect(result).toMatchSnapshot();
  });

  it('renders as expected without forms, query builder, and pagination', () => {
    const result = renderer.render(
      <CRUDTable caption="Tasks" items={tasks}>
        <Fields>
          <Field name="id" label="Id" hideInCreateForm readOnly />
          <Field name="title" label="Title" placeholder="Title" />
          <Field
            name="description"
            label="Description"
            render={DescriptionRenderer}
          />
        </Fields>
      </CRUDTable>
    );
    expect(result).toMatchSnapshot();
  });

  it('renders as expected when passing promise fetchers', () => {
    const fetchItems = jest.fn(() => Promise.resolve(tasks));
    const fetchTotal = jest.fn(() => Promise.resolve(tasks.length));
    const result = renderer.render(
      <CRUDTable caption="Tasks" fetchItems={fetchItems}>
        <Fields>
          <Field name="id" label="Id" hideInCreateForm readOnly />
          <Field name="title" label="Title" placeholder="Title" />
          <Field
            name="description"
            label="Description"
            render={DescriptionRenderer}
          />
        </Fields>
        <Pagination itemsPerPage={2} fetchTotalOfItems={fetchTotal} />
      </CRUDTable>
    );
    expect(result).toMatchSnapshot();
  });

  describe('Behavior', () => {
    let result;

    beforeEach(() => {
      result = create(
        <CRUDTable
          onChange={onChange}
          caption="Tasks"
          items={tasks}
          showQueryBuilder
        >
          <Fields>
            <Field name="id" label="Id" hideInCreateForm readOnly />
            <Field name="title" label="Title" placeholder="Title" />
            <Field
              name="description"
              label="Description"
              render={DescriptionRenderer}
            />
          </Fields>
          <CreateForm
            title="Task Creation"
            message="Create a new task!"
            trigger="Create Task"
            onSubmit={createSubmit}
            submitText="Create"
            validate={createValidate}
          />

          <UpdateForm
            title="Task Update Process"
            message="Update task"
            trigger="Update"
            onSubmit={updateSubmit}
            submitText="Update"
            validate={updateValidate}
          />

          <DeleteForm
            title="Task Delete Process"
            message="Are you sure you want to delete the task?"
            trigger="Delete"
            onSubmit={deleteSubmit}
            submitText="Delete"
            validate={deleteValidate}
          />
          <Pagination itemsPerPage={2} totalOfItems={tasks.length} />
        </CRUDTable>
      );
    });

    it('loads data using promise fetchers', () => {
      const fetchItems = jest.fn(() => Promise.resolve(tasks));
      const fetchTotal = jest.fn(() => Promise.resolve(tasks.length));
      const result = create(
        <CRUDTable caption="Tasks" fetchItems={fetchItems} onChange={onChange}>
          <Fields>
            <Field name="id" label="Id" hideInCreateForm readOnly />
            <Field name="title" label="Title" placeholder="Title" />
            <Field
              name="description"
              label="Description"
              render={DescriptionRenderer}
            />
          </Fields>
          <Pagination itemsPerPage={2} fetchTotalOfItems={fetchTotal} />
        </CRUDTable>
      );
      expect(fetchItems).toHaveBeenCalledTimes(1);
      expect(fetchTotal).toHaveBeenCalledTimes(1);
    });

    it('handles sort changes', () => {
      const button = result.root.findByType(Header);

      button.props.onClick('name', 'descending');

      expect(onChange).toHaveBeenCalledTimes(1);
      expect(onChange).toHaveBeenCalledWith({
        pagination: {
          activePage: 1,
          fields: [],
          itemsPerPage: 2,
          totalOfItems: 2,
        },
        queryRules: [],
        sort: { direction: 'descending', field: 'name' },
      });
    });

    it('handles query rules changes', () => {
      const builder = result.root.findByType(QueryBuilder);

      const rule = {
        field: 'name',
        condition: 'CONTAINS',
        value: 'John',
      };

      builder.props.onRuleAdded(rule);
      builder.props.onRuleRemoved(rule);

      const base = {
        pagination: {
          activePage: 1,
          fields: [],
          itemsPerPage: 2,
          totalOfItems: 2,
        },
        sort: { direction: 'descending', field: 'id' },
      };

      expect(onChange).toHaveBeenCalledTimes(2);
      expect(onChange).toHaveBeenCalledWith({
        ...base,
        queryRules: [rule],
      });

      expect(onChange).toHaveBeenCalledWith({
        ...base,
        queryRules: [],
      });
    });

    it('handles page changes', () => {
      const button = result.root.findByType(PaginationCpt);

      button.props.onPageChange(2);

      expect(onChange).toHaveBeenCalledTimes(1);
      expect(onChange).toHaveBeenCalledWith({
        pagination: {
          activePage: 2,
          fields: [],
          itemsPerPage: 2,
          totalOfItems: 2,
        },
        queryRules: [],
        sort: { direction: 'descending', field: 'id' },
      });
    });

    it('handles item creation', () => {
      const forms = result.root.findAllByType(FormModal);

      const item = { name: 'Name' };
      forms[0].props.onSubmit(item).then(() => {
        expect(createSubmit).toHaveBeenCalledTimes(1);
        expect(createSubmit).toHaveBeenCalledWith(item);
        expect(onChange).toHaveBeenCalledTimes(1);
        expect(onChange).toHaveBeenCalledWith({
          pagination: {
            activePage: 1,
            fields: [],
            itemsPerPage: 2,
            totalOfItems: 2,
          },
          queryRules: [],
          sort: { direction: 'descending', field: 'id' },
        });
      });
    });

    it('handles item update', () => {
      const forms = result.root.findAllByType(FormModal);

      const item = { name: 'Name' };
      forms[1].props.onSubmit(item).then(() => {
        expect(updateSubmit).toHaveBeenCalledTimes(1);
        expect(updateSubmit).toHaveBeenCalledWith(item);
        expect(onChange).toHaveBeenCalledTimes(1);
        expect(onChange).toHaveBeenCalledWith({
          pagination: {
            activePage: 1,
            fields: [],
            itemsPerPage: 2,
            totalOfItems: 2,
          },
          queryRules: [],
          sort: { direction: 'descending', field: 'id' },
        });
      });
    });

    it('handles item delete', () => {
      const forms = result.root.findAllByType(FormModal);

      const item = { name: 'Name' };
      forms[2].props.onSubmit(item).then(() => {
        expect(deleteSubmit).toHaveBeenCalledTimes(1);
        expect(deleteSubmit).toHaveBeenCalledWith(item);
        expect(onChange).toHaveBeenCalledTimes(1);
        expect(onChange).toHaveBeenCalledWith({
          pagination: {
            activePage: 1,
            fields: [],
            itemsPerPage: 2,
            totalOfItems: 2,
          },
          queryRules: [],
          sort: { direction: 'descending', field: 'id' },
        });
      });
    });

    it('handles create form visibility change', () => {
      const forms = result.root.findAllByType(FormModal);
      forms[0].props.onVisibilityChange(true);
      expect(result.root.instance.state.createModalVisible).toEqual(true);
    });

    it('handles update form visibility change', () => {
      const forms = result.root.findAllByType(FormModal);
      forms[1].props.onVisibilityChange(true);
      expect(result.root.instance.state.updateModalVisible).toEqual(true);
    });

    it('handles delete form visibility change', () => {
      const forms = result.root.findAllByType(FormModal);
      forms[2].props.onVisibilityChange(true);
      expect(result.root.instance.state.deleteModalVisible).toEqual(true);
    });

    it('handles update modal trigger process', () => {
      const item = {
        id: 1,
        name: 'Test',
      };
      const body = result.root.findByType(Body);
      body.props.onUpdateClick(item);
      expect(result.root.instance.state.updateModalVisible).toEqual(true);
      expect(result.root.instance.state.updateItem).toEqual(item);
    });

    it('handles delete modal trigger process', () => {
      const item = {
        id: 1,
        name: 'Test',
      };
      const body = result.root.findByType(Body);
      body.props.onDeleteClick(item);
      expect(result.root.instance.state.deleteModalVisible).toEqual(true);
      expect(result.root.instance.state.deleteItem).toEqual(item);
    });
  });
});
