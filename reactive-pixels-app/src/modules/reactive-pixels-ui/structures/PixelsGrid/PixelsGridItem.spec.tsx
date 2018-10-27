import * as React from "react";
import { render } from "react-testing-library";
import WithRouter from "../../utils/test/WithRouter";
import WithTheme from "../../utils/test/WithTheme";
import PixelsGridItem from "./PixelsGridItem";

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
