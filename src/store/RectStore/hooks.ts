import { useEffect, useState } from "react";
import { Point, Rectangle } from "../../types";
import { actions, store } from "./store";
import _ from "lodash";
import { singleOrError } from "../../utils/utils";

export const useRectanglesUtils = () => {
  const getRectanglePoints = (rectId: string): Record<string, Point> => {
    const { x, y, width, height } = singleOrError(store.value, (x) => x.id === rectId);

    return {
      topLeft: { x, y },
      topMiddle: { x: x + width / 2, y },
      topRight: { x: x + width, y },
      rightMiddle: { x: x + width, y: y + height / 2 },
      bottomRight: { x: x + width, y: y + height },
      bottomMiddle: { x: x + width / 2, y: y + height },
      bottomLeft: { x, y: y + height },
      leftMiddle: { x, y: y + height / 2 },
    };
  };

  const getRectanglePointsAsArray = (rectId: string) => {
    const points = getRectanglePoints(rectId);
    return Object.values(points);
  };

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
    actions.updateRect(rect.id, rect);
  };

  const detachConnector = (conId: string, position: "start" | "end") => {
    const connectedRect = store.value.find((x) =>
      x.connectors.some((x) => x.conId === conId && x.position === position)
    );

    if (connectedRect) {
      connectedRect.connectors = connectedRect.connectors.filter((x) => x.conId !== conId);
      actions.updateRect(connectedRect.id, connectedRect);
    }
  };

  return {
    getRectanglesCoordinateRange,
    findRectangleUnderMouse,
    attachConnector,
    detachConnector,
    getRectanglePoints,
    getRectanglePointsAsArray,
  };
};

// one hook causes rerenders
export const useRectanglesActions = () => {
  return actions;
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
