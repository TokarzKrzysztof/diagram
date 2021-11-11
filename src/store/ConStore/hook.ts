import { useEffect, useState } from "react";
import { Connector } from "../../types";
import { singleOrError } from "../../utils";
import { actions, store } from "./store";

// one hook causes rerenders
export const useConnectorsActions = () => {
  const getConnectedConnector = (conId: string) => {
    const con = singleOrError(store.value, (x) => x.id === conId);
    return con;
  };

  return { ...actions, getConnectedConnector };
};

export const useConnectorsState = () => {
  const [state, setState] = useState<Connector[]>(store.value);

  useEffect(() => {
    const sub = store.subscribe((value) => setState(value));
    return () => sub.unsubscribe();
  }, []);

  return {
    connectors: state,
  };
};
