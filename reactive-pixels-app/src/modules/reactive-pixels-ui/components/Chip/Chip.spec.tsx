import * as React from 'react';
import { render } from 'react-testing-library';
import WithTheme from '../../utils/test/WithTheme';
import { Chip } from './';

describe('<Chip />', () => {
  it('should render <Chip /> component', () => {
    const { container } = render(
      <WithTheme>
        <Chip />
      </WithTheme>,
    );

    expect(container.firstChild).toMatchSnapshot();
  });
});
