import bcc from 'bem-react-component-creator';

const { block } = bcc('crud-label');

const Label = block('div');
Label.displayName = 'Label';

export default Label;
