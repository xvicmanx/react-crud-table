// @flow

import React from 'react';
import RuleBuilder from './RuleBuilder';
import Rules from './Rules';
import { Container } from './wrappers';

type Props = {
  queryRules: Array<Object>,
  fields: Array<Object>,
  renderRule?: Function,
  onRuleAdded: Function,
  onRuleRemoved: Function,
};

const QueryBuilder = (props: Props): React$Element<any> => {
  const { queryRules, fields, renderRule, onRuleAdded, onRuleRemoved } = props;
  return (
    <Container>
      <RuleBuilder
        fields={fields}
        onSave={onRuleAdded}
        fieldsSelectPlaceholder="Select field"
        conditionsSelectPlaceholder="Select condition"
      />
      <Rules
        queryRules={queryRules}
        onRuleRemoved={onRuleRemoved}
        renderRule={renderRule}
      />
    </Container>
  );
};

export default QueryBuilder;
