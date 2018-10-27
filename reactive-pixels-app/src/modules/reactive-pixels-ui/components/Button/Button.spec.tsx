import * as React from "react";
import { cleanup, render } from "react-testing-library";
import WithTheme from "../../utils/test/WithTheme";
import { Button } from "./";

const mockOnClickFn = jest.fn().mockImplementation(() => console.log("Hello"));

function renderComponent(props: any) {
  const { variant = "default" } = props;
  const { size = "small" } = props;

  return render(
    <WithTheme>
      <Button data-testid="button-under-test" {...props}>
        I am a {size} {variant} button
      </Button>
    </WithTheme>
  );
}

describe("<Button />", () => {
  beforeEach(() => {
    jest.restoreAllMocks();
  });

  afterEach(cleanup);

  describe("variants", () => {
    it("should render a default <Button /> component", () => {
      const { container } = renderComponent({
        onClick: mockOnClickFn,
        variant: "default"
      });

      expect(container.firstChild).toMatchSnapshot();
    });

    it("should render a `primary` <Button /> component", () => {
      const { container } = renderComponent({
        onClick: mockOnClickFn,
        variant: "primary"
      });

      expect(container.firstChild).toMatchSnapshot();
    });

    it("should render a `secondary` <Button /> component", () => {
      const { container } = renderComponent({
        onClick: mockOnClickFn,
        variant: "secondary"
      });

      expect(container.firstChild).toMatchSnapshot();
    });
  });

  describe("sizes", () => {
    it("should render a `small` <Button /> component", () => {
      const { container } = renderComponent({
        onClick: mockOnClickFn,
        size: "small"
      });

      expect(container.firstChild).toMatchSnapshot();
    });

    it("should render a `small` <Button /> component", () => {
      const { container } = renderComponent({
        onClick: mockOnClickFn,
        size: "large"
      });

      expect(container.firstChild).toMatchSnapshot();
    });
  });
});
