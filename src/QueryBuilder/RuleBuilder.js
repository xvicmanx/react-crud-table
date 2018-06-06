import React from 'react';
import {
  CONDITIONS_LABEL,
  CONDITIONS,
  DEFAULT_STATE,
} from './constants';
import {
  conditionsForType,
  getDefaultConditionForType,
  inputForType,
} from './helpers';
import Button from '../Button';
import Select from './Select';
import { RuleBuilder as Container } from './wrappers';
import {
  mapFieldsToOptions,
  isBoolean,
  isRuleComplete,
} from './helpers';
import { queryValue } from '../CRUDTable/helpers';


export default class RuleBuilder extends React.Component {
  constructor(props) {
    super(props);
    this.state = DEFAULT_STATE;
    this.handleFieldSelectChange = this.handleFieldSelectChange.bind(this);
  }

  save() {
    if (isRuleComplete(this.state)) {
      this.props.onSave(this.state);
      this.setState(DEFAULT_STATE);
    }
  }

  find(field) {
    return this.props.fields
      .find(t => t.value === field);
  }

  getType(field) {
    return queryValue(
      this.find(field),
      'type',
      ''
    );
  }

  getCollection(field) {
    return queryValue(
      this.find(field),
      'collection',
      ''
    );
  }

  getDefaultCondition(field) {
    const defaultconditionForType = getDefaultConditionForType(
      this.getType(field),
    );

    return queryValue(
      this.find(field),
      'defaultCondition',
      defaultconditionForType
    );
  }

  getLabel(field) {
    return queryValue(
      this.find(field),
      'label',
      ''
    );
  }

  handleFieldSelectChange(evt, data) {
    const { value } = data;
    const update = {
      field: value,
      type: this.getType(value),
      label: this.getLabel(value),
      collection: this.getCollection(value),
    };

    const defaultCondition = this.getDefaultCondition(value);

    if (defaultCondition) {
      update.condition = defaultCondition;
    }

    if (isBoolean(update.type)) {
      update.condition = CONDITIONS.IS;
      update.value = false;
    }

    this.setState(update);
  }

  render() {
    const { field, value, condition } = this.state;
    const type = this.getType(field);
    const input = inputForType(type, {
      value,
      onChange: evt => {
        console.log(evt.target.value);
        this.setState({ value: evt.target.value });
      }
    });

    return (
      <Container>
        <Select
          placeholder={this.props.fieldsSelectPlaceholder}
          options={mapFieldsToOptions(this.props.fields)}
          value={field}
          onChange={this.handleFieldSelectChange}
        />
        &nbsp;&nbsp;

        {!isBoolean(type) && (
          <span>
            <Select
              placeholder={this.props.conditionsSelectPlaceholder}
              options={conditionsForType(type)}
              value={condition}
              onChange={(evt, data) => {
                this.setState({ condition: data.value });
              }}
            />
            &nbsp;&nbsp;
          </span>
        )}

        {input}
        &nbsp;&nbsp;

        <Button
          modifiers="positive,add"
          onClick={this.save.bind(this)}
        >
          +
        </Button>
      </Container>
    );
  }
}

RuleBuilder.defaultProps = {
  fields: [],
  fieldsSelectPlaceholder: 'Select field',
  conditionsSelectPlaceholder: 'Select condition',
};
