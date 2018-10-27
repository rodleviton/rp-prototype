import * as React from "react";
import { render } from "react-testing-library";
import WithRouter from "../../utils/test/WithRouter";
import WithTheme from "../../utils/test/WithTheme";
import { PixelsLoader } from "./";

describe("<PixelsLoader />", () => {
  it("should render <PixelsLoader /> component", () => {
    const { container } = render(
      <WithRouter>
        <WithTheme>
          <PixelsLoader />
        </WithTheme>
      </WithRouter>
    );

    expect(container.firstChild).toMatchSnapshot();
  });
});
