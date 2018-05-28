import bcc from 'bem-react-component-creator';

const { block, element } = bcc('crud-table-query-builder');

export const Container = block('div');
export const RuleBuilder = element('div', 'search-rule-builder');

export default { Container, RuleBuilder };
