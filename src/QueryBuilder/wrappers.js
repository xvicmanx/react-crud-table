import bcc from 'bem-react-component-creator';

const { block, element } = bcc('crud-table-query-builder');

export const Container = block('div');

Container.displayName = 'Container';

export const RuleBuilder = element('div', 'search-rule-builder');

RuleBuilder.displayName = 'RuleBuilder';

export const SearchRules = element('div', 'search-rules');

SearchRules.displayName = 'SearchRules';

export default { Container, RuleBuilder, SearchRules };
