import React from 'react';
import renderer from 'react-test-renderer';
import { Message } from './';

describe('Message', () => {
  it('Renders confidential messages correctly', () => {
    const tree = renderer
      .create(
        <Message
          key="1"
          message={{ id: '1', author: 'Jean', text: 'Test message.', confidential: true }}
        />
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });

  it('Renders non confidential messages correctly', () => {
    const tree = renderer
      .create(
        <Message
          key="1"
          message={{ id: '1', author: 'Jean-Pierre', text: 'Test public message.', confidential: false }}
        />
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
