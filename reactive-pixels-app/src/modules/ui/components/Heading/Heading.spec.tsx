import * as React from "react";
import { render } from "react-testing-library";
import WithTheme from "../../utils/test/WithTheme";
import { Heading } from "./";

describe("<Heading />", () => {
  it("should render <Heading /> component", () => {
    const { container } = render(
      <WithTheme>
        <Heading>Lorem ipsum</Heading>
      </WithTheme>
    );

    expect(container.firstChild).toMatchSnapshot();
  });
});
