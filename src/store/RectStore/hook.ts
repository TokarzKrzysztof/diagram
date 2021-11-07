import { useEffect, useState } from "react";
import { Point, Rectangle } from "../../types";
import { actions, store } from "./store";
import _ from "lodash";

// one hook causes rerenders
export const useRectanglesActions = () => {
  const getRectanglesCoordinateRange = () => {
    const rects = store.value;
    const result = rects.map((rect) => {
      return {
        id: rect.id,
        startX: rect.x,
        endX: rect.x + rect.width,
        startY: rect.y,
        endY: rect.y + rect.height,
      };
    });

    return result;
  };

  const findRectangleUnderMouse = (mousePosition: Point): Rectangle | null => {
    const coordinates = getRectanglesCoordinateRange();
    const rects = store.value;

    let result: Rectangle | null = null;
    coordinates.forEach(({ startX, endX, startY, endY, id }) => {
      const isX = mousePosition.x >= startX && mousePosition.x <= endX;
      const isY = mousePosition.y >= startY && mousePosition.y <= endY;
      if (isX && isY) result = rects.find((x) => x.id === id) as Rectangle;
    });

    return result;
  };

  return { ...actions, getRectanglesCoordinateRange, findRectangleUnderMouse };
};

export const useRectanglesState = () => {
  const [state, setState] = useState<Rectangle[]>(store.value);

  useEffect(() => {
    const sub = store.subscribe((value) => setState(value));
    return () => sub.unsubscribe();
  }, []);

  return {
    rectangles: state,
  };
};
