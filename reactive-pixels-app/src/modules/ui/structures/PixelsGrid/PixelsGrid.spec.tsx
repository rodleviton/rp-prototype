import { PixelsGrid } from "@modules/ui/structures/PixelsGrid";
import WithRouter from "@modules/ui/utils/test/WithRouter";
import WithTheme from "@modules/ui/utils/test/WithTheme";
import * as React from "react";
import { render } from "react-testing-library";

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
