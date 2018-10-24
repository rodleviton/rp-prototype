import * as React from 'react';
import { render } from 'react-testing-library';
import WithTheme from '../../utils/test/WithTheme';
import { AppBar } from './';

describe('<AppBar />', () => {
  it('should render <AppBar /> component', () => {
    const { container } = render(
      <WithTheme>
        <AppBar />
      </WithTheme>,
    );

    expect(container.firstChild).toMatchSnapshot();
  });
});
