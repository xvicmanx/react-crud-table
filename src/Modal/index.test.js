import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import { create } from 'react-test-renderer';

import { Container } from './wrappers';
import Button from '../Button';
import Modal from './';

const renderer = new ShallowRenderer();

describe('Modal', () => {
  const props = {
    trigger: 'Open',
    title: 'Test title',
    onShow: jest.fn(),
    onHide: jest.fn(),
    visible: true,
  };

  it('renders as expected with the given props', () => {
    const result = renderer.render(
      <Modal {...props} visible={false}>
        Test
      </Modal>
    );
    expect(result).toMatchSnapshot();
  });

  it('notifies when opened', () => {
    const result = create(<Modal {...props} />);

    const buttons = result.root.findAllByType(Button);

    buttons[0].props.onClick();

    expect(props.onShow).toHaveBeenCalledTimes(1);
  });

  it('notifies when closed', () => {
    const result = create(<Modal {...props} />);

    result.root.findByType(Container.BG).props.onClick();

    expect(props.onHide).toHaveBeenCalledTimes(1);
  });
});
