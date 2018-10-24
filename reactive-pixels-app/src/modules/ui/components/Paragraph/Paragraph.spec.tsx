import * as React from "react";
import { render } from "react-testing-library";
import WithTheme from "../../utils/test/WithTheme";
import { Paragraph } from "./";

describe("<Paragraph />", () => {
  it("should render the default <Paragraph /> component", () => {
    const { container } = render(
      <WithTheme>
        <Paragraph>Lorem ipsum.</Paragraph>
      </WithTheme>
    );

    expect(container.firstChild).toMatchSnapshot();
  });

  describe("variants", () => {
    it("should render the `light` colour paragraph", () => {
      const { container } = render(
        <WithTheme>
          <Paragraph colour="light">Lorem ipsum.</Paragraph>
        </WithTheme>
      );

      expect(container.firstChild).toMatchSnapshot();
    });

    it("should render the `dark` colour paragraph", () => {
      const { container } = render(
        <WithTheme>
          <Paragraph colour="dark">Lorem ipsum.</Paragraph>
        </WithTheme>
      );

      expect(container.firstChild).toMatchSnapshot();
    });
  });

  describe("variants", () => {
    it("should render the `body1` variant paragraph", () => {
      const { container } = render(
        <WithTheme>
          <Paragraph variant="body1">Lorem ipsum.</Paragraph>
        </WithTheme>
      );

      expect(container.firstChild).toMatchSnapshot();
    });

    it("should render the `body2` variant paragraph", () => {
      const { container } = render(
        <WithTheme>
          <Paragraph variant="body2">Lorem ipsum.</Paragraph>
        </WithTheme>
      );

      expect(container.firstChild).toMatchSnapshot();
    });

    it("should render the `subheading` variant paragraph", () => {
      const { container } = render(
        <WithTheme>
          <Paragraph variant="subheading">Lorem ipsum.</Paragraph>
        </WithTheme>
      );

      expect(container.firstChild).toMatchSnapshot();
    });
  });
});
