import React from 'react';
import renderer from 'react-test-renderer';
import { Messages } from './';

describe('Messages', () => {
  it('Renders correctly', () => {
    const tree = renderer
      .create(
        <Messages />
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
