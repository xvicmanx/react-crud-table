// @flow

import React from 'react';
import RuleBuilder from './RuleBuilder';
import Rules from './Rules';
import { Container } from './wrappers';

type Props = {
  fields: Array<Object>,
  onChange: Function,
  renderRule: Function,
};

type State = {
  query: Array<Object>,
};

class QueryBuilder extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { query: [] };
  }

  handleSave(selection: Object) {
    const { query } = this.state;
    const { onChange } = this.props;
    const update = {
      query: [...query, selection],
    };
    this.setState(update);
    onChange(update.query);
  }

  remove(rule: Object) {
    const { query } = this.state;
    const { onChange } = this.props;
    const update = {
      query: query.filter((x) => x.field !== rule.field
        || x.condition !== rule.condition),
    };
    this.setState(update);
    onChange(update.query);
  }

  render(): React$Element<any> {
    const { query } = this.state;
    const { fields, renderRule } = this.props;
    return (
      <Container>
        <RuleBuilder
          fields={fields}
          onSave={(selection) => this.handleSave(selection)}
        />
        <Rules
          queries={query}
          onRuleRemoved={(rule) => this.remove(rule)}
          renderRule={renderRule}
        />
      </Container>
    );
  }
}

export default QueryBuilder;
