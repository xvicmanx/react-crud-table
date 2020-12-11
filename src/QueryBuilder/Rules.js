import React from 'react';
import PropTypes from 'prop-types';
import { defaultRuleRender } from './helpers';
import Button from '../Button';

const Rules = ({ queries, onRuleRemoved, renderRule }) =>
  queries.length > 0 && (
    <div>
      {queries.map((rule) => {
        const renderer = renderRule || defaultRuleRender;
        return (
          <div key={`${rule.field}:${rule.condition}`}>
            {renderer(rule)}
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
        );
      })}
      <br />
    </div>
  );

Rules.propTypes = {
  queries: PropTypes.instanceOf(Array).isRequired,
  onRuleRemoved: PropTypes.func.isRequired,
  renderRule: PropTypes.func.isRequired,
};

export default Rules;
