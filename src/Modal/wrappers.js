import bcc from 'bem-react-component-creator';

const { block, element } = bcc('crud-modal-wrapper');

export const Container = block('div');
Container.BG = element('div', 'background');
Container.Modal = element('div', 'modal');

export default {
  Container
};
