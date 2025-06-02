import type { TModeInput } from "@/components/custom-input/multiple-input";

import { render, screen } from "@/test-utils";
import { InputGuard } from "../input-guard";

type TSetupProps = {
  data?: Array<{ id: string; text: string }>;
  statusInput: TModeInput;
};

describe("<InputGuard />", () => {
  const MOCK_DATA: TSetupProps["data"] = [
    { id: "mock-id1", text: "mock-text1" },
    { id: "mock-id2", text: "mock-text2" },
  ];

  const setup = ({ data = [], statusInput }: TSetupProps) => {
    const agrs = render(
      <InputGuard
        data={data}
        statusInput={statusInput}
        renderNodata={<div data-testid="render-nodata" />}
        renderBlurMode={(item) => (
          <div key={item.id} data-testid="render-blur-item">
            {item.text}
          </div>
        )}
        renderFocusMode={(item) => (
          <div data-testid="render-focus-item">{JSON.stringify(item)}</div>
        )}
      />
    );

    return { ...agrs };
  };

  it("should render nodata", () => {
    setup({ statusInput: "BLUR" });

    expect(screen.getByTestId("render-nodata")).toBeInTheDocument();
  });

  it("should render focus list", () => {
    setup({ data: MOCK_DATA, statusInput: "FOCUS" });

    const getDivBlurList = screen.getAllByTestId("render-focus-item");

    expect(getDivBlurList).toHaveLength(1);
  });

  it("should render blur list", () => {
    setup({ data: MOCK_DATA, statusInput: "BLUR" });

    const getDivBlurList = screen.getAllByTestId("render-blur-item");

    expect(getDivBlurList).toHaveLength(2);
    expect(screen.getByText("mock-text1")).toBeInTheDocument();
    expect(screen.getByText("mock-text2")).toBeInTheDocument();
  });
});
