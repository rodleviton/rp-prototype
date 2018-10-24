import * as React from "react";
import { render } from "react-testing-library";
import WithTheme from "../../utils/test/WithTheme";
import { Logo } from "./";

describe("<Logo />", () => {
  it("should render <Logo /> component", () => {
    const { container } = render(
      <WithTheme>
        <Logo scale={1} />
      </WithTheme>
    );

    expect(container.firstChild).toMatchSnapshot();
  });
});
