import type { FC, PropsWithChildren } from "react";

import { Provider } from "jotai";

const JotaiProvider: FC<PropsWithChildren> = ({ children }) => {
  return <Provider>{children}</Provider>;
};

export default JotaiProvider;
