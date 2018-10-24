import { Slider } from "@modules/ui/structures/Slider";
import WithRouter from "@modules/ui/utils/test/WithRouter";
import WithTheme from "@modules/ui/utils/test/WithTheme";
import * as React from "react";
import { render } from "react-testing-library";

describe("<Slider />", () => {
  it("should render <Slider /> component", () => {
    const { container } = render(
      <WithRouter>
        <WithTheme>
          <Slider />
        </WithTheme>
      </WithRouter>
    );

    expect(container.firstChild).toMatchSnapshot();
  });
});
