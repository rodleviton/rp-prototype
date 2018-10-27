import * as React from 'react';
import { render } from 'react-testing-library';
import WithTheme from '../../utils/test/WithTheme';
import { Grid } from './';

describe('<Grid />', () => {
  it('should render <Grid /> component', () => {
    const { container } = render(
      <WithTheme>
        <Grid />
      </WithTheme>,
    );

    expect(container.firstChild).toMatchSnapshot();
  });
});
