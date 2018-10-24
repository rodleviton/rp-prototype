import * as React from "react";
import { render } from "react-testing-library";
import WithRouter from "../../utils/test/WithRouter";
import WithTheme from "../../utils/test/WithTheme";
import { AuthorCard } from "./";

describe("<AuthorCard />", () => {
  it("should render <AuthorCard /> component", () => {
    const { container } = render(
      <WithRouter>
        <WithTheme>
          <AuthorCard name="Rod Leviton" avatar="images/avatar.png" />
        </WithTheme>
      </WithRouter>
    );

    expect(container.firstChild).toMatchSnapshot();
  });
});
