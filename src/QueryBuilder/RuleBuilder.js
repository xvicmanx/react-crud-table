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


export default class RuleBuilder extends React.Component {
  constructor(props) {
    super(props);
    this.state = DEFAULT_STATE;
  }

  save() {
    const { condition, value, field } = this.state; 
    if (condition != "" && value !== '' && field !== '') {
      this.props.onSave(this.state);
      this.setState(DEFAULT_STATE);
    }
  }

  find(field) {
    return this.props.fields
      .find(t => t.value === field);
  }

  getType(field) {
    const match = this.find(field);
    return match ? match.type : '';
  }

  getCollection(field) {
    const match = this.find(field);
    return match ? match.collection : '';
  }

  getDefaultCondition(field) {
    const match = this.find(field);
    const defaultconditionForType = getDefaultConditionForType(
      this.getType(field),
    );

    return match && match.defaultCondition ?
      match.defaultCondition : defaultconditionForType;
  }

  getLabel(field) {
    const match = this.find(field);
    return match ? match.label : '';
  }

  render() {
    const { field, value, condition } = this.state;
    const type = this.getType(field);
    const input = inputForType(type, {
      value,
      onChange: evt => {
        this.setState({ value: evt.target.value });
      }
    });

    return (
      <Container>
        <Select
          placeholder="Seleccione campo"
          options={this.props.fields.map((x) => {
            return {
              text: x.label,
              value: x.value,
              key: x.value,
            }
          })}
          value={field}
          onChange={(evt, data) => {
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

            if (update.type === 'boolean') {
              update.condition = CONDITIONS.IS;
              update.value = false;
            }

            this.setState(update);
          }}
        />
        &nbsp;&nbsp;
        {type !== 'boolean' && (
          <span>
            <Select
              placeholder="Seleccione condición"
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
};