import * as React from 'react';
import { render } from 'react-testing-library';
import WithTheme from '../../utils/test/WithTheme';
import { Box } from './';

describe('<Box />', () => {
  it('should render <Box /> component', () => {
    const { container } = render(
      <WithTheme>
        <Box />
      </WithTheme>,
    );

    expect(container.firstChild).toMatchSnapshot();
  });
});
