import { FC } from "react";
import { Rectangle } from "../../../types/Rectangle";
import { getNumberAtrributes } from "../../../utils";
import { ResizeDot } from "../../shared/ResizeDot/ResizeDot";

interface Props {
  rectSvgRef: React.RefObject<SVGSVGElement>;
  onUpdateRect: (data: Rectangle) => void;
  data: Rectangle;
}

export const RectResizeDots: FC<Props> = ({
  rectSvgRef,
  onUpdateRect,
  data,
}) => {
  const oneIfNegative = (value: number) => (value < 1 ? 1 : value);

  const handleResize = (
    e: MouseEvent,
    placement: "top-left" | "top-right" | "bottom-left" | "bottom-right"
  ) => {
    const [x, y, width, height] = getNumberAtrributes(rectSvgRef, [
      "x",
      "y",
      "width",
      "height",
    ]);

    if (placement === "top-left") {
      onUpdateRect({
        ...data,
        width: oneIfNegative(width - e.movementX),
        height: oneIfNegative(height - e.movementY),
        y: y + e.movementY,
        x: x + e.movementX,
      });
    } else if (placement === "top-right") {
      onUpdateRect({
        ...data,
        width: oneIfNegative(width + e.movementX),
        height: oneIfNegative(height - e.movementY),
        y: y + e.movementY,
      });
    } else if (placement === "bottom-left") {
      onUpdateRect({
        ...data,
        width: oneIfNegative(width - e.movementX),
        height: oneIfNegative(height + e.movementY),
        x: x + e.movementX,
      });
    } else {
      onUpdateRect({
        ...data,
        width: oneIfNegative(width + e.movementX),
        height: oneIfNegative(height + e.movementY),
      });
    }
  };

  return (
    <>
      <ResizeDot
        onResize={(e) => handleResize(e, "top-left")}
        cx={0}
        cy={0}
        style={{ cursor: "nw-resize" }}
      />
      <ResizeDot
        onResize={(e) => handleResize(e, "top-right")}
        cx={"100%"}
        cy={0}
        style={{ cursor: "ne-resize" }}
      />
      <ResizeDot
        onResize={(e) => handleResize(e, "bottom-left")}
        cx={0}
        cy={"100%"}
        style={{ cursor: "sw-resize" }}
      />
      <ResizeDot
        onResize={(e) => handleResize(e, "bottom-right")}
        cx={"100%"}
        cy={"100%"}
        style={{ cursor: "se-resize" }}
      />
    </>
  );
};
