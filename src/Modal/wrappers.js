import bcc from 'bem-react-component-creator';

const { block, element } = bcc('crud-modal-wrapper');

export const Container = block('div');
Container.displayName = 'Wrapper';

Container.BG = element('div', 'background');
Container.BG.displayName = 'Background';

Container.Modal = element('div', 'modal');
Container.Modal.displayName = 'Modal';

Container.Title = element('h3', 'title');
Container.Title.displayName = 'Title';

export default {
  Container,
};
