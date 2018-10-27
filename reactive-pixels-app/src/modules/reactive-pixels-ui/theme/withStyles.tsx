import * as React from "react";
import { IBaseTheme } from "./";
import { ThemeConsumer } from "./ThemeProvider";
interface IOptions {
  withTheme?: boolean;
}

const withStyles = (styles: (theme: IBaseTheme) => any, options?: IOptions) => {
  return (WrappedComponent: React.ComponentType<any>) => {
    return class WithStyles extends React.Component<any> {
      public static displayName = `WithStyles(${WrappedComponent.name})`;

      public render() {
        return (
          <ThemeConsumer>
            {(theme: any) => {
              if (!theme) {
                Error(
                  "Missing Theme: Please provide a valid theme to the <ThemeProvider />"
                );

                // Just return the wrapped component
                return <WrappedComponent {...this.props} />;
              }

              const mergedStyles = styles ? styles(theme) : {};
              const useTheme = options && options.withTheme;
              const otherProps = useTheme
                ? { classes: mergedStyles, theme }
                : { classes: mergedStyles };

              return <WrappedComponent {...this.props} {...otherProps} />;
            }}
          </ThemeConsumer>
        );
      }
    };
  };
};

export default withStyles;
