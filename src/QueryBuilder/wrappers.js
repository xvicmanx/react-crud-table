import bcc from 'bem-react-component-creator';

const { block, element } = bcc('crud-table-query-builder');

export const Container = block('div');

Container.displayName = 'Container';

export const RuleBuilder = element('div', 'search-rule-builder');

RuleBuilder.displayName = 'RuleBuilder';

export default { Container, RuleBuilder };
