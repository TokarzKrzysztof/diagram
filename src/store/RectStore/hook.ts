import { useEffect, useState } from "react";
import { Rectangle } from "../../types";
import { actions, store } from "./store";

export const useRectangles = () => {
  const [state, setState] = useState<Rectangle[]>(store.value);

  useEffect(() => {
    const sub = store.subscribe((value) => setState(value));
    return () => sub.unsubscribe();
  }, []);

  return {
    rectangles: state,
    ...actions,
  };
};
