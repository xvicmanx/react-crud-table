import React from 'react';
import DateTime from 'react-datetime';
import Label from '../Label';
import { CONDITIONS_LABEL, CONDITIONS } from './constants';

let styles;

const Input = (props) => <input {...props} />;

export const isRuleComplete = (rule) => {
  const { condition, value, field } = rule;
  return condition !== '' && value !== '' && field !== '';
};

export const isBoolean = (type) => type === 'boolean';

export const mapFieldsToOptions = (fields) =>
  fields.map((x) => ({
    text: x.label,
    value: x.value,
    key: x.value,
  }));

export const defaultRuleRender = (rule) => {
  if (isBoolean(rule.type)) {
    return (
      <span>
        <Label style={styles.label}>{rule.condition}</Label>
        &nbsp;
        <Label style={styles.label}>{rule.label}</Label>
      </span>
    );
  }
  return (
    <span>
      <Label style={styles.label}>{rule.label}</Label>
      &nbsp;
      <Label style={styles.label}>{CONDITIONS_LABEL[rule.condition]}</Label>
      &nbsp;
      <Label style={styles.label}>{rule.value}</Label>
    </span>
  );
};

export const conditionsForType = (type) => {
  let result;
  switch (type) {
    case 'number':
    case 'date':
      result = [
        CONDITIONS.EQUALS_TO,
        CONDITIONS.LESS_THAN,
        CONDITIONS.GREATER_THAN,
        CONDITIONS.LESS_OR_EQUALS_THAN,
        CONDITIONS.GREATER_OR_EQUALS_THAN,
        CONDITIONS.IS_NOT_EQUALS_TO,
        CONDITIONS.IS_NOT_LESS_THAN,
        CONDITIONS.IS_NOT_GREATER_THAN,
        CONDITIONS.IS_NOT_LESS_OR_EQUALS_THAN,
        CONDITIONS.IS_NOT_GREATER_OR_EQUALS_THAN,
      ];
      break;
    case 'boolean':
      result = [CONDITIONS.IS, CONDITIONS.IS_NOT];
      break;
    default:
      result = [
        CONDITIONS.CONTAINS,
        CONDITIONS.EQUALS_TO,
        CONDITIONS.BEGINS_WITH,
        CONDITIONS.ENDS_WITH,
        CONDITIONS.IS_NOT_EQUALS_TO,
        CONDITIONS.DOES_NOT_BEGIN_WITH,
        CONDITIONS.DOES_NOT_END_WITH,
        CONDITIONS.DOES_NOT_CONTAIN,
      ];
      break;
  }

  return result.map((r) => ({
    value: r,
    text: CONDITIONS_LABEL[r],
    key: r,
  }));
};

export const getDefaultConditionForType = (type) => {
  switch (type) {
    case 'number':
      return CONDITIONS.EQUALS_TO;
    case 'date':
      return CONDITIONS.GREATER_OR_EQUALS_THAN;
    default:
      return CONDITIONS.CONTAINS;
  }
};

export const inputForType = (type, props) => {
  switch (type) {
    case 'number':
      return <Input type="number" {...props} />;
    case 'boolean':
      return (
        <Input
          {...props}
          type="checkbox"
          onClick={(evt) => {
            props.onChange({
              ...evt,
              target: {
                ...evt.target,
                value: evt.target.checked,
              },
            });
          }}
          onChange={() => {}}
        />
      );
    case 'date':
      return (
        <DateTime
          {...props}
          className="ui input"
          dateFormat="YYYY-MM-DD"
          timeFormat="hh:mm A"
          onChange={(data) => {
            props.onChange({
              target: {
                value: data.format('YYYY-MM-DD hh:mm A'),
              },
            });
          }}
        />
      );
    default:
      return <Input type="text" {...props} />;
  }
};

styles = {
  label: {
    marginBottom: '5px',
  },
};

export default {
  defaultRuleRender,
  conditionsForType,
  getDefaultConditionForType,
  inputForType,
  mapFieldsToOptions,
  isBoolean,
  isRuleComplete,
};
