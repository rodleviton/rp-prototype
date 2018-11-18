import * as React from "react";

interface IProps {
  condition: boolean;
  render: (shouldRender: boolean) => React.ReactNode;
}

interface IState {
  shouldRender: boolean;
}

/**
 * DeferredRenderer
 *
 * @description
 * Component for defering the mounting fo a component until a condition is met
 *
 * @example
 * <DeferredRenderer condition={boolean} render={() => <div />} />
 */
class DeferredRenderer extends React.PureComponent<IProps, IState> {
  public state = {
    shouldRender: false
  };

  public checkCondition() {
    const { condition } = this.props;
    const { shouldRender } = this.state;

    // Only evaluate to true once
    if (!shouldRender && condition) {
      this.setState({ shouldRender: true });
    }
  }

  public componentDidMount() {
    this.checkCondition();
  }

  public componentDidUpdate() {
    this.checkCondition();
  }

  public render() {
    const { render } = this.props;
    const { shouldRender } = this.state;

    return render(shouldRender);
  }
}

export default DeferredRenderer;
