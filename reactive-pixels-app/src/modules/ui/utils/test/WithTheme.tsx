import { createTheme, ThemeProvider } from "@modules/ui/theme";
import * as React from "react";

const theme = createTheme();

class WithTheme extends React.Component<{}> {
  public render() {
    const { children } = this.props;
    return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
  }
}

export default WithTheme;
