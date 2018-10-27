import * as React from 'react';
import { render } from 'react-testing-library';
import WithTheme from '../../utils/test/WithTheme';
import { TagCollection } from './';

describe('<TagCollection />', () => {
  it('should render <TagCollection /> component', () => {
    const tags = ['motion', 'webgl', 'canvas'];
    const { container } = render(
      <WithTheme>
        <TagCollection tags={tags} />
      </WithTheme>,
    );

    expect(container.firstChild).toMatchSnapshot();
  });
});
