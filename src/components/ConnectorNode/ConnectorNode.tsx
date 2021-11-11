import React from "react";
import { FC, useRef } from "react";
import { useConnectorsActions, useRectanglesUtils } from "../../store";
import { Connector } from "../../types";
import { getNumberAtrributes } from "../../utils";
import { Dragable } from "../shared";
import { ConResizeDots } from "./ConResizeDots/ConResizeDots";

interface Props {
  data: Connector;
  onSetActive: (data: Connector) => void;
}

export const ConnectorNode: FC<Props> = React.memo<Props>(({ data, onSetActive }) => {
  const { updateCon } = useConnectorsActions();
  const { detachConnector } = useRectanglesUtils();
  const ref = useRef<SVGLineElement>(null);

  const handleUpdateCon = (con: Connector) => {
    if (!data.isActive) return;
    updateCon(con.id, con);
  };

  const handleMove = (e: MouseEvent) => {
    const [startX, startY, endX, endY] = getNumberAtrributes(ref, ["x1", "y1", "x2", "y2"]);

    detachConnector(data.id, "start");
    detachConnector(data.id, "end");
    handleUpdateCon({
      ...data,
      start: {
        x: startX + e.movementX,
        y: startY + e.movementY,
      },
      end: {
        x: endX + e.movementX,
        y: endY + e.movementY,
      },
    });
  };

  const { start, end } = data;
  return (
    <Dragable onMove={handleMove} onMouseDown={() => onSetActive(data)}>
      {/* arrow */}
      <marker refY={2} refX={3} markerWidth={6} markerHeight={6} id="arrow" orient="auto">
        <polygon points="0 0, 0 4, 4 2" fill={"white"} />
      </marker>
      {/* line */}
      <line
        ref={ref}
        x1={start.x}
        y1={start.y}
        x2={end.x}
        y2={end.y}
        stroke={"white"}
        strokeWidth={4}
        markerEnd="url(#arrow)"
      ></line>

      {data.isActive && <ConResizeDots onUpdateCon={handleUpdateCon} data={data} />}
    </Dragable>
  );
});
