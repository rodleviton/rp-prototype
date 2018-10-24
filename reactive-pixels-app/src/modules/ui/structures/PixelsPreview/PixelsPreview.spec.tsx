import { PixelsPreview } from "@modules/ui/structures/PixelsPreview";
import WithRouter from "@modules/ui/utils/test/WithRouter";
import WithTheme from "@modules/ui/utils/test/WithTheme";
import * as React from "react";
import { render } from "react-testing-library";

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
