import React from 'react';
import renderer from 'react-test-renderer';

it('react snapshot', () => {
  const tree = renderer.create(<div>Demo</div>).toJSON();
  expect(tree).toMatchSnapshot();
});
