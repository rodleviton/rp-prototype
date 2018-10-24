import { PixelsGridItem } from "@modules/ui/structures/PixelsGrid";
import WithRouter from "@modules/ui/utils/test/WithRouter";
import WithTheme from "@modules/ui/utils/test/WithTheme";
import * as React from "react";
import { render } from "react-testing-library";

describe("<PixelsGridItem />", () => {
  it("should render <PixelsGridItem /> component", () => {
    const { container } = render(
      <WithRouter>
        <WithTheme>
          <PixelsGridItem />
        </WithTheme>
      </WithRouter>
    );

    expect(container.firstChild).toMatchSnapshot();
  });
});
