import * as React from "react";
import { render } from "react-testing-library";
import WithRouter from "../../utils/test/WithRouter";
import WithTheme from "../../utils/test/WithTheme";
import { PixelsPreview } from "./";

describe("<PixelsPreview />", () => {
  it("should render <PixelsPreview /> component", () => {
    const { container } = render(
      <WithRouter>
        <WithTheme>
          <PixelsPreview src="" to="" />
        </WithTheme>
      </WithRouter>
    );

    expect(container.firstChild).toMatchSnapshot();
  });
});
