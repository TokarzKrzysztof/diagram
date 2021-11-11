import { useEffect, useState } from "react";
import { Connector } from "../../types";
import { singleOrError } from "../../utils";
import { actions, store } from "./store";

export const useConnectorsUtils = () => {
  const getConnectedConnector = (conId: string) => {
    const con = singleOrError(store.value, (x) => x.id === conId);
    return con;
  };

  return { getConnectedConnector };
};

// one hook causes rerenders
export const useConnectorsActions = () => {
  return actions;
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
