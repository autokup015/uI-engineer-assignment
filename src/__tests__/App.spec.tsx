import App from "@/App";
import { render, screen } from "@/test-utils";
import { vi } from "vitest";

vi.mock("@/components/custom-input");

describe("App.tsx", () => {
  it("should render App.tsx", () => {
    render(<App />);

    expect(screen.getByText("UI Engineer Assignment")).toBeInTheDocument();
  });
});
