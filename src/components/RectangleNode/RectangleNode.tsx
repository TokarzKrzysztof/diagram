import React from "react";
import { FC, useEffect, useRef, useState } from "react";
import { useRectangles } from "../../store";
import { Rectangle } from "../../types";
import { getNumberAtrributes } from "../../utils";
import { Dragable } from "../shared";
import { RectResizeDots } from "./RectResizeDots/RectResizeDots";
import { TextNode } from "./TextNode/TextNode";

interface Props {
  data: Rectangle;
  onSetActive: (data: Rectangle) => void;
}

export const RectangleNode: FC<Props> = React.memo<Props>(
  ({ data, onSetActive }) => {
    const { updateRect } = useRectangles();
    const ref = useRef<SVGSVGElement>(null);
    const [isEditText, setIsEditText] = useState(false);

    const handleUpdateRect = (rect: Rectangle) => {
      updateRect(rect.id, rect);
    };
    console.log("render");

    const handleMove = (e: MouseEvent) => {
      const [x, y] = getNumberAtrributes(ref, ["x", "y"]);
      data.x = x + e.movementX;
      data.y = y + e.movementY;
      handleUpdateRect(data);
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
          <rect
            width={"100%"}
            height={"100%"}
            stroke={"white"}
            strokeWidth={2}
          />
          <TextNode
            value={data.text}
            isEditing={isEditText}
            onAccept={handleTextEdit}
          />
          {data.isActive && (
            <RectResizeDots
              onUpdateRect={handleUpdateRect}
              rectSvgRef={ref}
              data={data}
            />
          )}
        </svg>
      </Dragable>
    );
  }
);
