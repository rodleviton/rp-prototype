import * as React from 'react';
import { render } from 'react-testing-library';
import WithTheme from '../../utils/test/WithTheme';
import { Loader } from './';

describe('<Loader />', () => {
  it('should render <Loader /> component', () => {
    const { container } = render(
      <WithTheme>
        <Loader />
      </WithTheme>,
    );

    expect(container.firstChild).toMatchSnapshot();
  });
});
