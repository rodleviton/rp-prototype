import { PixelsSandbox } from "@modules/ui/structures/PixelsSandbox";
import WithRouter from "@modules/ui/utils/test/WithRouter";
import WithTheme from "@modules/ui/utils/test/WithTheme";
import * as React from "react";
import { render } from "react-testing-library";

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
