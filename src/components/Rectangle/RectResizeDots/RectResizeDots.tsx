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
        console.log(prev);
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
