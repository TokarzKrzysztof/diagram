import { useEffect, useState } from "react";
import { Point } from "../../types";
import { actions, store } from "./store";

export const useSVGRoot = () => {
  const [state, setState] = useState<SVGSVGElement | null>(store.value);

  useEffect(() => {
    const sub = store.subscribe((value) => setState(value));
    return () => sub.unsubscribe();
  }, []);

  const getMouseToSvgRelativePosition = (e: MouseEvent): Point => {
    const svg = state;
    if (!svg) throw new Error("No svg in hook state");

    const rect = svg.getBoundingClientRect();

    return {
      x: e.pageX - rect.x - window.scrollX,
      y: e.pageY - rect.y - window.scrollY,
    };
  };

  return {
    svg: state,
    getMouseToSvgRelativePosition,
    ...actions,
  };
};
