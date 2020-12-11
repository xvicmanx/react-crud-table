import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import { create } from 'react-test-renderer';

import Enzyme from 'enzyme';

import { Pagination as Container } from './wrappers';

import Pagination from '.';

const renderer = new ShallowRenderer();

describe('Pagination', () => {
  let onChange;

  beforeEach(() => {
    onChange = jest.fn();
  });

  it('renders as expected when in the first page', () => {
    const result = renderer.render(
      <Pagination
        activePage={1}
        totalOfItems={10}
        itemsPerPage={2}
        onPageChange={onChange}
      />
    );
    expect(result).toMatchSnapshot();
  });

  it('renders as expected when in the last page', () => {
    const result = renderer.render(
      <Pagination
        activePage={5}
        totalOfItems={10}
        itemsPerPage={2}
        onPageChange={onChange}
      />
    );
    expect(result).toMatchSnapshot();
  });

  it('renders as expected when in a page in the middle', () => {
    const result = renderer.render(
      <Pagination
        activePage={3}
        totalOfItems={10}
        itemsPerPage={2}
        onPageChange={onChange}
      />
    );
    expect(result).toMatchSnapshot();
  });

  const Foo = () => <div />;

  it('notifies a page change when clicking a numbered link', () => {
    const result = create(
      <Pagination
        activePage={3}
        totalOfItems={10}
        itemsPerPage={2}
        onPageChange={onChange}
      />
    );

    result.root.findByType(Container.Prev).props.onClick();
    result.root.findByType(Container.Next).props.onClick();
    result.root.findAllByType(Container.Link).forEach((item) => {
      item.props.onClick();
    });

    expect(onChange).toHaveBeenCalledTimes(7);
    expect(onChange.mock.calls).toEqual([[2], [4], [1], [2], [3], [4], [5]]);
  });
});
