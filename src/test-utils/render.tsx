import type { ReactNode } from "react";

import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

const customRender = (ui: ReactNode) => {
  userEvent.setup();

  return {
    user: userEvent.setup(),
    ...render(ui),
  };
};

// eslint-disable-next-line react-refresh/only-export-components
export * from "@testing-library/react";

export { customRender as render };
