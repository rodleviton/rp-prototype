import * as React from 'react';
import { MemoryRouter as Router } from 'react-router-dom';

class WithRouter extends React.Component<{}> {
  public render() {
    const { children } = this.props;
    return <Router>{children}</Router>;
  }
}

export default WithRouter;
