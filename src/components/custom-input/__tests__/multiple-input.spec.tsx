import { render, screen } from "@/test-utils";
import { BoxBlurList, BoxFocusList, MultipleInput } from "../multiple-input";
import { vi } from "vitest";

describe("multiple-input.tsx", () => {
  const mockValue = [
    { id: "mock-id-1", text: "mock-text-1" },
    { id: "mock-id-2", text: "mock-text-2" },
  ];

  const mockValueLimit = [
    { id: "mock-id-1", text: "mock-text-1" },
    { id: "mock-id-2", text: "mock-text-2" },
    { id: "mock-id-3", text: "mock-text-3" },
  ];

  describe("<MultipleInput />", () => {
    const setup = ({
      value = [],
    }: {
      value?: Array<{ id: string; text: string }>;
    }) => {
      const mockSetValue = vi.fn();

      const mockDeleteValue = vi.fn();

      const agrs = render(
        <MultipleInput
          value={value}
          onSetValue={mockSetValue}
          onDeleteValue={mockDeleteValue}
          limitItem={3}
        />
      );

      return {
        ...agrs,
        mockSetValue,
        mockDeleteValue,
      };
    };

    it("should render MultipleInput component", () => {
      setup({});

      expect(screen.getByTestId("box-main-input")).toBeInTheDocument();
      expect(screen.getByTestId("input-text")).toBeInTheDocument();
    });

    it("should focus input when click main box", async () => {
      const { user } = setup({});
      const getInput = screen.getByTestId("input-text");

      await user.click(screen.getByTestId("box-main-input"));

      expect(document.activeElement).toBe(getInput);
    });

    it("should add value with input", async () => {
      const { user, mockSetValue } = setup({});
      const getInput = screen.getByTestId("input-text");

      await user.type(getInput, "mock-data");
      await user.keyboard("{Enter}");

      expect(mockSetValue).toHaveBeenCalledTimes(1);
    });

    it("should not add value when use another key excetp Enter", async () => {
      const { user, mockSetValue } = setup({});
      const getInput = screen.getByTestId("input-text");

      await user.type(getInput, "mock-data");
      await user.keyboard("{Tap}");

      expect(mockSetValue).not.toHaveBeenCalled();
    });

    it("should add data when data have 2 , limit is 3", async () => {
      const { user, mockSetValue } = setup({ value: mockValue });
      const getInput = screen.getByTestId("input-text");

      await user.type(getInput, "mock-data");
      await user.keyboard("{Enter}");

      expect(mockSetValue).toHaveBeenCalledTimes(1);
    });

    it("should not add data when data have 3 , limit is 3", async () => {
      const { user, mockSetValue } = setup({ value: mockValueLimit });
      const getInput = screen.getByTestId("input-text");

      await user.type(getInput, "mock-data");
      await user.keyboard("{Enter}");

      expect(mockSetValue).not.toHaveBeenCalledTimes(1);
    });

    it("should delete item", async () => {
      const { user, mockDeleteValue } = setup({ value: mockValueLimit });
      const getBtnDel = screen.getAllByTestId("button-del");

      await user.click(getBtnDel[0]);

      expect(mockDeleteValue).toHaveBeenCalled();
    });
  });

  describe("<BoxBlurList />", () => {
    const setup = () => {
      const mockDelFunction = vi.fn();

      const agrs = render(
        <BoxBlurList
          data={{ id: "mock-id", text: "mock-text" }}
          onRemove={mockDelFunction}
        />
      );

      return {
        ...agrs,
        mockDelFunction,
      };
    };

    it("should render BoxBlurList component", () => {
      setup();

      expect(screen.getByText("mock-text")).toBeInTheDocument();
    });

    it("should call function delete item ", async () => {
      const { user, mockDelFunction } = setup();
      const getBtnDel = screen.getByTestId("button-del");

      await user.click(getBtnDel);

      expect(mockDelFunction).toHaveBeenCalledTimes(1);
    });
  });

  describe("<BoxFocusList />", () => {
    const setup = ({ specialText = ", " }: { specialText?: string }) => {
      const agrs = render(
        <BoxFocusList data={["mock-1", "mock-2"]} specialText={specialText} />
      );

      return { ...agrs };
    };

    it("should render BoxFocusList component", () => {
      setup({});

      expect(screen.getByText("mock-1,")).toBeInTheDocument();
      expect(screen.getByText("mock-2")).toBeInTheDocument();
    });

    it("should render new specialText +", () => {
      setup({ specialText: "+ " });

      expect(screen.getByText("mock-1+")).toBeInTheDocument();
      expect(screen.getByText("mock-2")).toBeInTheDocument();
    });
  });
});
