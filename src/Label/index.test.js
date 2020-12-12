import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import Label from '.';

describe('Label', () => {
  it('renders properly', () => {
    const renderer = new ShallowRenderer();
    const result = renderer.render(<Label>Test</Label>);
    expect(result).toMatchSnapshot();
  });
});
