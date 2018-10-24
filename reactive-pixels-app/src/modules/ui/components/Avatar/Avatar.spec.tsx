import * as React from 'react';
import { render } from 'react-testing-library';
import WithTheme from '../../utils/test/WithTheme';
import { Avatar } from './';

describe('<Avatar />', () => {
  it('should render <Avatar /> component', () => {
    const { container } = render(
      <WithTheme>
        <Avatar />
      </WithTheme>,
    );

    expect(container.firstChild).toMatchSnapshot();
  });
});
