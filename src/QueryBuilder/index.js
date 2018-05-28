import React from "react";
import RuleBuilder from './RuleBuilder';
import Rules from './Rules';
import { Container } from './wrappers';

let styles;

class QueryBuilder extends React.Component {
  constructor(props) {
    super(props);
    this.state = { query: [] };
    this.remove = this.remove.bind(this);
    this.handleSave = this.handleSave.bind(this);
  }

  remove(rule) {
    const update = {
      query: this.state
      .query.filter(x => x.field !== rule.field ||
        x.condition !== rule.condition
      )
    };
    this.setState(update);
    this.props.onChange(update.query);
  }

  handleSave(selection) {
    const update = {
      query: [...this.state.query, selection]
    };
    this.setState(update);
    this.props.onChange(update.query);
  }

  render() {
    return (
      <Container>
        <RuleBuilder
          fields={this.props.fields}
          onSave={this.handleSave}
        />
        <Rules
          queries={this.state.query}
          onRuleRemoved={rule => this.remove(rule)}
          renderRule={this.props.renderRule}
        />
      </Container>
    );
  }
}

QueryBuilder.defaultProps = {
  fields: [],
  onChange: () => {},
};

export default QueryBuilder;
