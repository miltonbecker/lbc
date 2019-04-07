import React from 'react';
import renderer from 'react-test-renderer';
import { Post } from './';

describe('Post', () => {
  it('Renders correctly when logged in', () => {
    const tree = renderer
      .create(
        <Post
          textRef={React.createRef()}
          handlePost={e => {}}
          confidential={true}
          handleConfidentialChange={() => {}}
          loggedIn={true}
        />
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });

  it('Renders correctly when not logged in', () => {
    const tree = renderer
      .create(
        <Post
          textRef={React.createRef()}
          handlePost={e => {}}
          confidential={false}
          handleConfidentialChange={() => {}}
          loggedIn={false}
        />
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
