import React from "react";
import { SORT_DIRECTIONS } from "./constants";

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

export default {
  chevron,
  toggleDirection,
  queryValue
};
