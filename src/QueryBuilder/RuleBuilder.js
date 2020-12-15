// @flow

import React from 'react';

import Button from '../Button';
import Select from '../Select';
import { queryValue } from '../CRUDTable/helpers';
import {
  conditionsForType,
  getDefaultConditionForType,
  inputForType,
  mapFieldsToOptions,
  isBoolean,
  isRuleComplete,
} from './helpers';
import { CONDITIONS, DEFAULT_STATE } from './constants';
import { RuleBuilder as Container } from './wrappers';

type Field = {
  value: any,
};
type Props = {
  fields: Array<Field>,
  conditionsSelectPlaceholder: string,
  fieldsSelectPlaceholder: string,
  onSave: Function,
};

type State = {
  field: any,
  type: string,
  value: any,
  label: string,
  collection: string,
  condition: string,
};

type Data = {
  value: any,
};

class RuleBuilder extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = DEFAULT_STATE;
    // $FlowFixMe
    this.handleFieldSelectChange = this.handleFieldSelectChange.bind(this);
    // $FlowFixMe
    this.save = this.save.bind(this);
  }

  handleFieldSelectChange(evt: SyntheticEvent<HTMLSelectElement>) {
    const { value } = evt.currentTarget;
    const update: State = {
      ...this.state,
      field: value,
      type: this.getType(value),
      label: this.getLabel(value),
      collection: this.getCollection(value),
    };

    update.condition = this.getDefaultCondition(value);

    if (isBoolean(update.type)) {
      update.condition = CONDITIONS.IS;
      update.value = false;
    }

    this.setState(update);
  }

  getLabel(field: any): string {
    return queryValue(this.find(field), 'label', '');
  }

  getDefaultCondition(field: any): string {
    const defaultconditionForType = getDefaultConditionForType(
      this.getType(field)
    );

    return queryValue(
      this.find(field),
      'defaultCondition',
      defaultconditionForType
    );
  }

  getCollection(field: any): string {
    return queryValue(this.find(field), 'collection', '');
  }

  getType(field: any): string {
    return queryValue(this.find(field), 'type', '');
  }

  find(field: any): ?Field {
    const { fields } = this.props;
    return fields.find((f) => f.value === field);
  }

  save() {
    const { onSave } = this.props;
    if (isRuleComplete(this.state)) {
      onSave(this.state);
      this.setState(DEFAULT_STATE);
    }
  }

  render(): React$Element<any> {
    const {
      fields,
      conditionsSelectPlaceholder,
      fieldsSelectPlaceholder,
    } = this.props;
    const { field, value, condition } = this.state;
    const type = this.getType(field);
    const input = inputForType(type, {
      value,
      onChange: (evt) => {
        this.setState({ value: evt.currentTarget.value });
      },
    });

    return (
      <Container>
        <Select
          placeholder={fieldsSelectPlaceholder}
          options={mapFieldsToOptions(fields)}
          value={field}
          onChange={this.handleFieldSelectChange}
        />
        &nbsp;&nbsp;
        {!isBoolean(type) && (
          <span>
            <Select
              placeholder={conditionsSelectPlaceholder}
              options={conditionsForType(type)}
              value={condition}
              onChange={(evt, data) => {
                this.setState({ condition: evt.currentTarget.value });
              }}
            />
            &nbsp;&nbsp;
          </span>
        )}
        {input}
        &nbsp;&nbsp;
        <Button modifiers="positive,add" onClick={this.save}>
          +
        </Button>
      </Container>
    );
  }
}

export default RuleBuilder;
