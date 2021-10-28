import { FC } from "react";
import { RectModel } from "../../../models/RectModel";
import { ResizeDot } from "../../shared/ResizeDot/ResizeDot";
import { RectDotPlacement } from "../types";

interface Props {
  onSetConfig: React.Dispatch<React.SetStateAction<RectModel>>;
}

export const RectResizeDots: FC<Props> = ({ onSetConfig }) => {
  const handleResize = (e: MouseEvent, placement: RectDotPlacement) => {
    if (placement === "top-left") {
      onSetConfig((prev) => {
        return {
          ...prev,
          width: prev.width - e.movementX,
          height: prev.height - e.movementY,
          top: prev.top + e.movementY,
          left: prev.left + e.movementX,
        };
      });
    } else if (placement === "top-right") {
      onSetConfig((prev) => {
        return {
          ...prev,
          width: prev.width + e.movementX,
          height: prev.height - e.movementY,
          top: prev.top + e.movementY,
        };
      });
    } else if (placement === "bottom-left") {
      onSetConfig((prev) => {
        return {
          ...prev,
          width: prev.width - e.movementX,
          height: prev.height + e.movementY,
          left: prev.left + e.movementX,
        };
      });
    } else {
      onSetConfig((prev) => {
        return {
          ...prev,
          width: prev.width + e.movementX,
          height: prev.height + e.movementY,
        };
      });
    }
  };

  return (
    <>
      <ResizeDot
        onResize={(e) => handleResize(e, "top-left")}
        style={{
          top: 0,
          left: 0,
          transform: "translate(-50%, -50%)",
          cursor: "nw-resize",
        }}
      />
      <ResizeDot
        onResize={(e) => handleResize(e, "top-right")}
        style={{
          top: 0,
          right: 0,
          transform: "translate(50%, -50%)",
          cursor: "ne-resize",
        }}
      />
      <ResizeDot
        onResize={(e) => handleResize(e, "bottom-left")}
        style={{
          bottom: 0,
          left: 0,
          transform: "translate(-50%, 50%)",
          cursor: "sw-resize",
        }}
      />
      <ResizeDot
        onResize={(e) => handleResize(e, "bottom-right")}
        style={{
          bottom: 0,
          right: 0,
          transform: "translate(50%, 50%)",
          cursor: "se-resize",
        }}
      />
    </>
  );
};
