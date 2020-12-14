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

const UpArrow = () => <span>&#x25B2;</span>;
const DownArrow = () => <span>&#x25BC;</span>;

export const chevron = (direction) => {
  if (direction === SORT_DIRECTIONS.ASCENDING) {
    return <UpArrow />;
  }

  return <DownArrow />;
};

export const toggleDirection = (direction, toggle) => {
  if (toggle) {
    switch (direction) {
      case 'ascending':
        return 'descending';
      default:
        return 'ascending';
    }
  }
  return direction;
};

export const queryValue = (source, query = '', defaultValue = null) => {
  const value = query
    .split('.')
    .reduce(
      (result, key) => (result && result[key] ? result[key] : null),
      source
    );
  return value || defaultValue;
};

export const FILTER_BY_TYPE = (t) => (item) =>
  item.type && item.type.displayName === t;

export const getProps = (comp, fields = [], defaultValue = null) => {
  const props = comp ? comp.props : null;
  if (!props) return defaultValue;
  return {
    ...props,
    fields,
  };
};

export const extractFields = (items) => {
  const container = items.find(FILTER_BY_TYPE(FIELDS_COMPONENT_TYPE));
  const children = container
    ? React.Children.toArray(container.props.children)
    : [];
  return children
    .filter(FILTER_BY_TYPE(FIELD_COMPONENT_TYPE))
    .map((c) => c.props);
};

export const extractPagination = (items) => {
  const container = items.find(FILTER_BY_TYPE(PAGINATION_COMPONENT_TYPE));
  return getProps(container, [], {});
};

export const extractQueryFields = (items) => {
  const fields = extractFields(items);
  return fields
    .filter((f) => f.queryable)
    .map((f) => ({
      ...f,
      value: f.name,
    }));
};

export const extractForms = (items, fields) => ({
  create: getProps(
    items.find(FILTER_BY_TYPE(CREATE_FORM_COMPONENT_TYPE)),
    fields.filter((f) => !f.hideInCreateForm)
  ),
  update: getProps(
    items.find(FILTER_BY_TYPE(UPDATE_FORM_COMPONENT_TYPE)),
    fields.filter((f) => !f.hideInUpdateForm)
  ),
  delete: getProps(items.find(FILTER_BY_TYPE(DELETE_FORM_COMPONENT_TYPE))),
});

export const getTableFieldValue = (field, item) => {
  if (typeof field.tableValueResolver === 'string') {
    return queryValue(item, field.tableValueResolver);
  }

  if (typeof field.tableValueResolver === 'function') {
    return field.tableValueResolver(item);
  }

  return item[field.name];
};

export const getPaginationProps = (props) => {
  const items = React.Children.toArray(props.children);
  return extractPagination(items);
};

export const getDefaultState = (items, pagination) => ({
  items,
  sort: {
    field: ID_FIELD,
    direction: SORT_DIRECTIONS.DESCENDING,
  },
  queryRules: [],
  updateItem: {},
  deleteItem: {},
  createModalVisible: false,
  deleteModalVisible: false,
  updateModalVisible: false,
  pagination: {
    ...pagination,
    activePage: pagination.activePage || pagination.defaultActivePage || 1,
    totalOfItems: pagination.totalOfItems || 0,
    itemsPerPage: pagination.itemsPerPage || 10,
  },
  totalOfItems: pagination.totalOfItems || 0,
});

export default {
  chevron,
  toggleDirection,
  queryValue,
  getTableFieldValue,
  FILTER_BY_TYPE,
  extractFields,
  getProps,
  extractForms,
  extractPagination,
  extractQueryFields,
  getPaginationProps,
};
