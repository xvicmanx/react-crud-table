import bcc from 'bem-react-component-creator';

const { block, element } = bcc('crud-modal-wrapper');

export const Container = block('div');
Container.BG = element('div', 'background');
Container.Modal = element('div', 'modal');
Container.Title = element('h3', 'title');

export default {
  Container,
};
