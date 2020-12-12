// @flow
import React from 'react';
import { defaultRuleRender } from './helpers';
import Button from '../Button';
import { NO_OP } from '../helpers';

export type Props = {
  queryRules: Array<Object>,
  onRuleRemoved: Function,
  renderRule: Function,
};

const Rules = (props: Props): React$Element<any> => {
  const { queryRules, onRuleRemoved, renderRule } = props;

  return (
    <div>
      {queryRules.map((rule) => (
        <div key={`${rule.field}:${rule.condition}`}>
          {renderRule(rule)}
          {'  '}
          <Button
            onClick={() => {
              onRuleRemoved(rule);
            }}
            modifiers="negative,circular"
          >
            X
          </Button>
        </div>
      ))}
      <br />
    </div>
  );
};

Rules.defaultProps = {
  renderRule: defaultRuleRender,
  queryRules: ([]: Array<Object>),
  onRuleRemoved: NO_OP,
};

export default Rules;
