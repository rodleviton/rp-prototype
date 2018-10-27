import * as React from 'react';
import { render } from 'react-testing-library';
import WithRouter from '../../utils/test/WithRouter';
import WithTheme from '../../utils/test/WithTheme';
import { PixelsCard } from './';

describe('<PixelsCard />', () => {
  it('should render <PixelsCard /> component', () => {
    const { container } = render(
      <WithRouter>
        <WithTheme>
          <PixelsCard />
        </WithTheme>
      </WithRouter>,
    );

    expect(container.firstChild).toMatchSnapshot();
  });
});
