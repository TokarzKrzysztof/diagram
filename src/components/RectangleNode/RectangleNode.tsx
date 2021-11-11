import React from "react";
import { FC, useEffect, useRef, useState } from "react";
import {
  useConnectorsActions,
  useConnectorsUtils,
  useRectanglesActions,
  useRectanglesUtils,
} from "../../store";
import { Rectangle } from "../../types";
import { getNumberAtrributes } from "../../utils";
import { Dragable } from "../shared";
import { RectResizeDots } from "./RectResizeDots/RectResizeDots";
import { TextNode } from "./TextNode/TextNode";

interface Props {
  data: Rectangle;
  onSetActive: (data: Rectangle) => void;
}

export const RectangleNode: FC<Props> = React.memo<Props>(({ data, onSetActive }) => {
  const { getRectanglePointsAsArray } = useRectanglesUtils();
  const { updateRect } = useRectanglesActions();
  const { getConnectedConnector } = useConnectorsUtils();
  const { updateCon } = useConnectorsActions();
  const ref = useRef<SVGSVGElement>(null);
  const [isEditText, setIsEditText] = useState(false);

  const handleUpdateRect = (rect: Rectangle) => {
    if (!data.isActive) return;
    updateRect(rect.id, rect);
  };

  const handleMove = (e: MouseEvent) => {
    const [x, y] = getNumberAtrributes(ref, ["x", "y"]);
    handleUpdateRect({ ...data, x: x + e.movementX, y: y + e.movementY });

    data.connectors.forEach(({ conId, position }) => {
      const con = getConnectedConnector(conId);
      if (position === "start") {
        con.start.x += e.movementX;
        con.start.y += e.movementY;
      } else {
        con.end.x += e.movementX;
        con.end.y += e.movementY;
      }

      updateCon(con.id, con);
    });
  };

  const moveConnectors = () => {
    const points = getRectanglePointsAsArray(data.id);
  };

  const handleTextEdit = (value: string) => {
    setIsEditText(false);
    handleUpdateRect({ ...data, text: value });
  };

  return (
    <Dragable onMove={handleMove} onMouseDown={() => onSetActive(data)}>
      <svg
        ref={ref}
        x={data.x}
        y={data.y}
        width={data.width}
        height={data.height}
        overflow={"visible"}
        onDoubleClick={() => setIsEditText(!isEditText)}
      >
        <rect width={"100%"} height={"100%"} stroke={"white"} strokeWidth={2} />
        <TextNode value={data.text} isEditing={isEditText} onAccept={handleTextEdit} />
        {data.isActive && (
          <RectResizeDots rectSvgRef={ref} onUpdateRect={handleUpdateRect} data={data} />
        )}
      </svg>
    </Dragable>
  );
});
