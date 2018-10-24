import * as React from "react";
import ResponsiveProvider from "./ResponsiveProvider";

const ThemeContext = React.createContext({});

interface IProps {
  theme: any;
}

class ThemeProvider extends React.Component<IProps> {
  public render() {
    const { theme, children } = this.props;

    return (
      <ResponsiveProvider>
        <ThemeContext.Provider value={theme}>{children}</ThemeContext.Provider>
      </ResponsiveProvider>
    );
  }
}

export const ThemeConsumer = ThemeContext.Consumer;

export default ThemeProvider;
