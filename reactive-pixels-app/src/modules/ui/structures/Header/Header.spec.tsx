import * as React from 'react';
import { render } from 'react-testing-library';
import WithRouter from '../../utils/test/WithRouter';
import WithTheme from '../../utils/test/WithTheme';
import { Header } from './';

describe('<Header />', () => {
  it('should render <Header /> component', () => {
    const { container } = render(
      <WithRouter>
        <WithTheme>
          <Header />
        </WithTheme>
      </WithRouter>,
    );

    expect(container.firstChild).toMatchSnapshot();
  });
});
