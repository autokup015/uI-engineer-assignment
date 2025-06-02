import type { ReactNode } from "react";
import type { TExtendsValue, TModeInput } from "../custom-input/multiple-input";

// ---------------------------------------------------------------------------------

type TInputGuardProps<T> = {
  data: Array<T>;
  statusInput: TModeInput;

  renderNodata: ReactNode;
  renderBlurMode: (item: T, index: number) => ReactNode;
  renderFocusMode: (item: Array<T>) => ReactNode;
};

const InputGuard = <T extends TExtendsValue>({
  data,
  statusInput,

  renderNodata,
  renderBlurMode,
  renderFocusMode,
}: TInputGuardProps<T>) => {
  if (!data.length) {
    return renderNodata;
  }

  if (statusInput === "BLUR") {
    return data.map((item, index) => renderBlurMode(item, index));
  }

  if (statusInput === "FOCUS") {
    return renderFocusMode(data);
  }
};

export { InputGuard };
