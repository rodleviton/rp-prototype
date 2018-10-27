import * as React from "react";
import { render } from "react-testing-library";
import WithRouter from "../../utils/test/WithRouter";
import WithTheme from "../../utils/test/WithTheme";
import { PixelsGrid } from "../PixelsGrid";

describe("<PixelsGrid />", () => {
  it("should render <PixelsGrid /> component", () => {
    const { container } = render(
      <WithRouter>
        <WithTheme>
          <PixelsGrid />
        </WithTheme>
      </WithRouter>
    );

    expect(container.firstChild).toMatchSnapshot();
  });
});
