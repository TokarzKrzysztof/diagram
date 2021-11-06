import { useEffect, useState } from "react";
import { actions, store } from "./store";

export const useSVGRoot = () => {
  const [state, setState] = useState<SVGSVGElement | null>(store.value);

  useEffect(() => {
    const sub = store.subscribe((value) => setState(value));
    return () => sub.unsubscribe();
  }, []);

  return {
    svg: state,
    ...actions,
  };
};
