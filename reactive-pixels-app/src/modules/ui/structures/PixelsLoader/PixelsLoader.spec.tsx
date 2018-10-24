import { PixelsLoader } from "@modules/ui/structures/PixelsLoader";
import WithRouter from "@modules/ui/utils/test/WithRouter";
import WithTheme from "@modules/ui/utils/test/WithTheme";
import * as React from "react";
import { render } from "react-testing-library";

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
