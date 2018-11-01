import * as React from "react";
import { getDisplayName } from "recompose";

const withSvg = <WrappedProps extends {}>(
  WrappedComponent: React.ComponentType<WrappedProps>
) => {
  return class WithSVG extends React.Component<WrappedProps> {
    public static displayName = `WithStyles(${getDisplayName(
      WrappedComponent
    )})`;

    public render() {
      const { ...otherProps } = this.props as {};
      const defaultSize = 16;

      return (
        <svg
          width={`${defaultSize}px`}
          height={`${defaultSize}px`}
          viewBox={`0 0 ${defaultSize} ${defaultSize}`}
          {...otherProps}
        >
          <WrappedComponent {...otherProps} />
        </svg>
      );
    }
  };
};

export default withSvg;
