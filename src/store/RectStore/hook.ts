import { useEffect, useState } from "react";
import { Connector, Point, Rectangle, RectConnector } from "../../types";
import { actions, store } from "./store";
import _ from "lodash";
import { singleOrError } from "../../utils/utils";

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
      if (isX && isY) result = singleOrError(rects, (x) => x.id === id);
    });

    return result;
  };

  const attachConnector = (rectId: string, conId: string, position: "start" | "end") => {
    const rect = singleOrError(store.value, (x) => x.id === rectId);
    if (rect.connectors.some((x) => x.conId === conId)) return;
    rect.connectors.push({ conId, position });
    console.log("attach");
    actions.updateRect(rect.id, rect);
  };

  const detachConnector = (conId: string, position: "start" | "end") => {
    const connectedRect = store.value.find((x) =>
      x.connectors.some((x) => x.conId === conId && x.position === position)
    );

    if (connectedRect) {
      connectedRect.connectors = connectedRect.connectors.filter((x) => x.conId !== conId);
      console.log("detach");
      actions.updateRect(connectedRect.id, connectedRect);
    }
  };

  return {
    ...actions,
    getRectanglesCoordinateRange,
    findRectangleUnderMouse,
    attachConnector,
    detachConnector,
  };
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
