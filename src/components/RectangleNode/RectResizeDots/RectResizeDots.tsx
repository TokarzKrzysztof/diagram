import { FC } from "react";
import { Rectangle } from "../../../types/Rectangle";
import { ResizeDot } from "../../shared/ResizeDot/ResizeDot";
import { RectDotPlacement } from "../types";

interface Props {
  onSetConfig: React.Dispatch<React.SetStateAction<Rectangle>>;
  config: Rectangle;
}

export const RectResizeDots: FC<Props> = ({ onSetConfig, config }) => {
  const oneIfNegative = (value: number) => (value < 1 ? 1 : value);

  const handleResize = (e: MouseEvent, placement: RectDotPlacement) => {
    if (placement === "top-left") {
      onSetConfig((prev) => {
        return {
          ...prev,
          width: oneIfNegative(prev.width - e.movementX),
          height: oneIfNegative(prev.height - e.movementY),
          y: prev.y + e.movementY,
          x: prev.x + e.movementX,
        };
      });
    } else if (placement === "top-right") {
      onSetConfig((prev) => {
        return {
          ...prev,
          width: oneIfNegative(prev.width + e.movementX),
          height: oneIfNegative(prev.height - e.movementY),
          y: prev.y + e.movementY,
        };
      });
    } else if (placement === "bottom-left") {
      onSetConfig((prev) => {
        return {
          ...prev,
          width: oneIfNegative(prev.width - e.movementX),
          height: oneIfNegative(prev.height + e.movementY),
          x: prev.x + e.movementX,
        };
      });
    } else {
      onSetConfig((prev) => {
        return {
          ...prev,
          width: oneIfNegative(prev.width + e.movementX),
          height: oneIfNegative(prev.height + e.movementY),
        };
      });
    }
  };

  const { x, y, width, height } = config;
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
