import { FC } from "react";
import { useConnectorsActions, useConnectorsUtils } from "../../../store";
import { Rectangle } from "../../../types/Rectangle";
import { getNumberAtrributes } from "../../../utils";
import { ResizeDot } from "../../shared/ResizeDot/ResizeDot";

interface Props {
  rectSvgRef: React.RefObject<SVGSVGElement>;
  onUpdateRect: (data: Rectangle) => void;
  data: Rectangle;
}

type DotPlacement =
  | "top-left"
  | "top-middle"
  | "top-right"
  | "right-middle"
  | "bottom-right"
  | "bottom-middle"
  | "bottom-left"
  | "left-middle";

export const RectResizeDots: FC<Props> = ({ rectSvgRef, onUpdateRect, data }) => {
  const { updateCon } = useConnectorsActions();
  const { getConnectedConnector } = useConnectorsUtils();
  const oneIfNegative = (value: number) => (value < 1 ? 1 : value);

  const handleResize = (e: MouseEvent, placement: DotPlacement) => {
    const [x, y, width, height] = getNumberAtrributes(rectSvgRef, ["x", "y", "width", "height"]);

    if (placement === "top-left") {
      onUpdateRect({
        ...data,
        width: oneIfNegative(width - e.movementX),
        height: oneIfNegative(height - e.movementY),
        y: y + e.movementY,
        x: x + e.movementX,
      });
    } else if (placement === "top-middle") {
      onUpdateRect({
        ...data,
        height: oneIfNegative(height - e.movementY),
        y: y + e.movementY,
      });
    } else if (placement === "top-right") {
      onUpdateRect({
        ...data,
        width: oneIfNegative(width + e.movementX),
        height: oneIfNegative(height - e.movementY),
        y: y + e.movementY,
      });
    } else if (placement === "right-middle") {
      onUpdateRect({
        ...data,
        width: oneIfNegative(width + e.movementX),
      });
    } else if (placement === "bottom-right") {
      onUpdateRect({
        ...data,
        width: oneIfNegative(width + e.movementX),
        height: oneIfNegative(height + e.movementY),
      });
    } else if (placement === "bottom-middle") {
      onUpdateRect({
        ...data,
        height: oneIfNegative(height + e.movementY),
      });
    } else if (placement === "bottom-left") {
      onUpdateRect({
        ...data,
        width: oneIfNegative(width - e.movementX),
        height: oneIfNegative(height + e.movementY),
        x: x + e.movementX,
      });
    } else {
      // left-middle
      onUpdateRect({
        ...data,
        width: oneIfNegative(width - e.movementX),
        x: x + e.movementX,
      });
    }

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

  const showMiddleHorizontalDots = data.height >= 50;
  const showMiddleVerticalDots = data.width >= 50;

  return (
    <>
      <ResizeDot
        onResize={(e) => handleResize(e, "top-left")}
        cx={0}
        cy={0}
        style={{ cursor: "nw-resize" }}
      />
      {showMiddleVerticalDots && (
        <ResizeDot
          onResize={(e) => handleResize(e, "top-middle")}
          cx={"50%"}
          cy={0}
          style={{ cursor: "n-resize" }}
        />
      )}
      <ResizeDot
        onResize={(e) => handleResize(e, "top-right")}
        cx={"100%"}
        cy={0}
        style={{ cursor: "ne-resize" }}
      />
      {showMiddleHorizontalDots && (
        <ResizeDot
          onResize={(e) => handleResize(e, "right-middle")}
          cx={"100%"}
          cy={"50%"}
          style={{ cursor: "e-resize" }}
        />
      )}
      <ResizeDot
        onResize={(e) => handleResize(e, "bottom-right")}
        cx={"100%"}
        cy={"100%"}
        style={{ cursor: "se-resize" }}
      />
      {showMiddleVerticalDots && (
        <ResizeDot
          onResize={(e) => handleResize(e, "bottom-middle")}
          cx={"50%"}
          cy={"100%"}
          style={{ cursor: "s-resize" }}
        />
      )}
      <ResizeDot
        onResize={(e) => handleResize(e, "bottom-left")}
        cx={0}
        cy={"100%"}
        style={{ cursor: "sw-resize" }}
      />
      {showMiddleHorizontalDots && (
        <ResizeDot
          onResize={(e) => handleResize(e, "left-middle")}
          cx={0}
          cy={"50%"}
          style={{ cursor: "w-resize" }}
        />
      )}
    </>
  );
};
