import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { DetailPageLayout } from "./DetailPageLayout";

describe("DetailPageLayout", () => {
  it("renders left and right columns", () => {
    render(
      <DetailPageLayout
        leftColumn={<div data-testid="left">Left Content</div>}
        rightColumn={<div data-testid="right">Right Content</div>}
      />
    );

    expect(screen.getByTestId("left")).toBeInTheDocument();
    expect(screen.getByTestId("right")).toBeInTheDocument();
    expect(screen.getByText("Left Content")).toBeInTheDocument();
    expect(screen.getByText("Right Content")).toBeInTheDocument();
  });

  it("renders with correct grid layout classes", () => {
    const { container } = render(
      <DetailPageLayout
        leftColumn={<div>Left</div>}
        rightColumn={<div>Right</div>}
      />
    );

    const gridContainer = container.firstChild as HTMLElement;
    expect(gridContainer).toHaveClass("grid", "grid-cols-1", "lg:grid-cols-3");
  });

  it("renders aside for left column with correct classes", () => {
    render(
      <DetailPageLayout
        leftColumn={<div>Left</div>}
        rightColumn={<div>Right</div>}
      />
    );

    const aside = document.querySelector("aside");
    expect(aside).toHaveClass("lg:col-span-1");
  });

  it("renders main for right column with correct classes", () => {
    render(
      <DetailPageLayout
        leftColumn={<div>Left</div>}
        rightColumn={<div>Right</div>}
      />
    );

    const main = document.querySelector("main");
    expect(main).toHaveClass("lg:col-span-2");
  });
});
