import * as React from "react";
import { createTheme, ThemeProvider } from "../../theme";

const theme = createTheme();

class WithTheme extends React.Component<{}> {
  public render() {
    const { children } = this.props;
    return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
  }
}

export default WithTheme;
