import bcc from 'bem-react-component-creator';

const { block } = bcc('crud-button');

export const Btn = block('button');

Btn.displayName = 'Button';

export default { Btn };
