import React from 'react';
import PropTypes from 'prop-types';
import { defaultRuleRender } from './helpers';
import Button from '../Button';
import { NO_OP } from '../helpers';

const Rules = ({ queryRules, onRuleRemoved, renderRule }) => (
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

Rules.propTypes = {
  queryRules: PropTypes.instanceOf(Array),
  onRuleRemoved: PropTypes.func,
  renderRule: PropTypes.func,
};

Rules.defaultProps = {
  renderRule: defaultRuleRender,
  queryRules: [],
  onRuleRemoved: NO_OP,
};

export default Rules;
