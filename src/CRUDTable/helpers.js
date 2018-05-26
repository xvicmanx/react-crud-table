import React from "react";
import {
  SORT_DIRECTIONS,
  FIELDS_COMPONENT_TYPE,
  FIELD_COMPONENT_TYPE,
  CREATE_FORM_COMPONENT_TYPE,
  DELETE_FORM_COMPONENT_TYPE,
  UPDATE_FORM_COMPONENT_TYPE,
  PAGINATION_COMPONENT_TYPE,
} from './constants';

export const chevron = direction => {
  return direction === SORT_DIRECTIONS.ASCENDING ? (
    <span>&#x25B2;</span>
  ) : (
    <span>&#x25BC;</span>
  );
};

export const toggleDirection = (direction, toggle) => {
  if (toggle) {
    switch (direction) {
      case "ascending":
        return "descending";
      default:
        return "ascending";
    }
  }
  return direction;
};

export const queryValue = (source, query = '', defaultValue = null) => {
  const value = query.split('.').reduce((result, key) => {
      return result && result[key] ? result[key] : null;
  }, source);
  return value || defaultValue;
};

export const FILTER_BY_TYPE = t => item => item.type && item.type.displayName === t;

export const getProps = (comp, fields = []) => {
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

export const extractFields = (items) => {
  const container = items.find(FILTER_BY_TYPE(FIELDS_COMPONENT_TYPE));
  const children = container ? 
    React.Children.toArray(container.props.children): [];
  return children
    .filter(FILTER_BY_TYPE(FIELD_COMPONENT_TYPE))
    .map(c => c.props);
};

export const extractPagination = (items) => {
  const container = items.find(FILTER_BY_TYPE(PAGINATION_COMPONENT_TYPE));
  return getProps(container);
};



export const extractForms = (items, fields) => ({
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

export default {
  chevron,
  toggleDirection,
  queryValue,
  FILTER_BY_TYPE,
  extractFields,
  getProps,
  extractForms,
  extractPagination,
};
