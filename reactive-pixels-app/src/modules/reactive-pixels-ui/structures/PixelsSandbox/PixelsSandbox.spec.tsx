import * as React from "react";
import { render } from "react-testing-library";
import WithRouter from "../../utils/test/WithRouter";
import WithTheme from "../../utils/test/WithTheme";
import { PixelsSandbox } from "./";

describe("<PixelsSandbox />", () => {
  it("should render <PixelsSandbox /> component", () => {
    const { container } = render(
      <WithRouter>
        <WithTheme>
          <PixelsSandbox src="" />
        </WithTheme>
      </WithRouter>
    );

    expect(container.firstChild).toMatchSnapshot();
  });
});
