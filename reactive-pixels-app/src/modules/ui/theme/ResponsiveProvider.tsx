import * as React from "react";

export const ResponsiveContext = React.createContext<IDimensions>(
  {} as IDimensions
);
export const ResponsiveConsumer = ResponsiveContext.Consumer;

export interface IWindowProps {
  target: {
    innerHeight: number;
    innerWidth: number;
  };
}

interface IProps {
  delay?: number;
}

interface IDimensions {
  width: number;
  height: number;
}

interface IState {
  dimensions: IDimensions;
}

const debounce = (fn: any, time: number) => {
  let timeout: any;

  return function(this: any, ...args: any[]) {
    const functionCall = window.requestAnimationFrame(() =>
      fn.apply(this, args)
    );

    clearTimeout(timeout);
    timeout = setTimeout(functionCall, time);
  };
};

/**
 *
 * ResponsiveProvider
 * @description Provider to assist with responsive elements
 */
class ResponsiveProvider extends React.PureComponent<IProps, IState> {
  public debouncedSetDimensions: any;

  constructor(props: IProps) {
    super(props);

    const DEFAULT_DELAY = 100;

    // debounce rate in ms
    const { delay = DEFAULT_DELAY } = this.props;

    this.state = {
      dimensions: {
        height: window.innerHeight,
        width: window.innerWidth
      }
    };

    this.debouncedSetDimensions = debounce(
      (newDimensions: IWindowProps) => this.setDimensions(newDimensions),
      delay
    );

    this.setDimensions = this.setDimensions.bind(this);
  }

  public setDimensions(newDimensions: IWindowProps) {
    this.setState({
      dimensions: {
        height: newDimensions.target.innerHeight,
        width: newDimensions.target.innerWidth
      }
    });
  }

  public componentDidMount() {
    window.addEventListener("resize", this.debouncedSetDimensions);
  }

  public componentWillUnmount() {
    window.removeEventListener("resize", this.debouncedSetDimensions);
  }

  public render() {
    return (
      <ResponsiveContext.Provider value={this.state.dimensions}>
        {this.props.children}
      </ResponsiveContext.Provider>
    );
  }
}

export default ResponsiveProvider;
