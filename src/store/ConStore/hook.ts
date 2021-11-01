import { useEffect, useState } from "react";
import { Connector } from "../../types";
import { actions, store } from "./store";

export const useConnectors = () => {
  const [state, setState] = useState<Connector[]>(store.value);

  useEffect(() => {
    const sub = store.subscribe((value) => setState(value));
    return () => sub.unsubscribe();
  }, []);

  return {
    connectors: state,
    ...actions,
  };
};
