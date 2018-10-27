import * as React from "react";
import { render } from "react-testing-library";
import WithRouter from "../../utils/test/WithRouter";
import WithTheme from "../../utils/test/WithTheme";
import { Slider } from "./";

describe("<Slider />", () => {
  it("should render <Slider /> component", () => {
    const { container } = render(
      <WithRouter>
        <WithTheme>
          <Slider />
        </WithTheme>
      </WithRouter>
    );

    expect(container.firstChild).toMatchSnapshot();
  });
});
