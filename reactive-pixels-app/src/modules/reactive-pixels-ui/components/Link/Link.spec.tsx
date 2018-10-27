import * as React from 'react';
import { render } from 'react-testing-library';
import WithRouter from '../../utils/test/WithRouter';
import WithTheme from '../../utils/test/WithTheme';
import { Link } from './';

describe('<Link />', () => {
  it('should render <Link /> component', () => {
    const { container } = render(
      <WithRouter>
        <WithTheme>
          <Link to="/" />
        </WithTheme>
      </WithRouter>,
    );

    expect(container.firstChild).toMatchSnapshot();
  });
});
