import _ from "lodash";
import { FC } from "react";
import { useRectanglesActions, useSVGRoot } from "../../../store";
import { Connector } from "../../../types";
import { getNearestPoint } from "../../../utils";
import { ResizeDot } from "../../shared";

interface Props {
  data: Connector;
  onUpdateCon: (data: Connector) => void;
}

export const ConResizeDots: FC<Props> = ({ data, onUpdateCon }) => {
  const { getMouseToSvgRelativePosition } = useSVGRoot();
  const { findRectangleUnderMouse, attachConnector, detachConnector } = useRectanglesActions();

  const handleResize = (e: MouseEvent, placement: "start" | "end") => {
    const connector = { ...data };
    const relativeMousePosition = getMouseToSvgRelativePosition(e);
    const rectToConnect = findRectangleUnderMouse(relativeMousePosition);

    if (rectToConnect) {
      const rectCoordinateRanges = {
        startX: rectToConnect.x,
        endX: rectToConnect.x + rectToConnect.width,
        startY: rectToConnect.y,
        endY: rectToConnect.y + rectToConnect.height,
      };
      if (placement === "start") {
        const point = getNearestPoint(connector.end, rectCoordinateRanges);
        connector.start = point;
        attachConnector(rectToConnect.id, connector.id, "start");
      } else {
        const point = getNearestPoint(connector.start, rectCoordinateRanges);
        connector.end = point;
        attachConnector(rectToConnect.id, connector.id, "end");
      }
    } else {
      if (placement === "start") {
        connector.start = relativeMousePosition;
        detachConnector(connector.id, "start");
      } else {
        connector.end = relativeMousePosition;
        detachConnector(connector.id, "end");
      }
    }

    onUpdateCon(connector);
  };

  const { start, end } = data;
  return (
    <>
      <ResizeDot
        onResize={(e) => handleResize(e, "start")}
        cx={start.x}
        cy={start.y}
        style={{ cursor: "move" }}
      />
      <ResizeDot
        onResize={(e) => handleResize(e, "end")}
        cx={end.x}
        cy={end.y}
        style={{ cursor: "move" }}
      />
    </>
  );
};
