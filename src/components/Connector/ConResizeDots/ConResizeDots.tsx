import { FC } from "react";
import { ConModel } from "../../../models/ConModel";
import { ResizeDot } from "../../shared/ResizeDot/ResizeDot";
import { ConDotPlacement } from "../types";

interface Props {
  onSetConfig: React.Dispatch<React.SetStateAction<ConModel>>;
}

export const ConResizeDots: FC<Props> = ({ onSetConfig }) => {
  const handleResize = (e: MouseEvent, placement: ConDotPlacement) => {
    console.log(e)
    if (placement === "start") {
      onSetConfig((prev) => {
        return {
          ...prev,
          width: prev.width - e.movementX,
          left: prev.left + e.movementX,
          rotate: prev.rotate + (e.movementY * 0.15)
        };
      });
    } else {
      onSetConfig((prev) => {
        return {
          ...prev,
          width: prev.width + e.movementX,
          rotate: prev.rotate + (e.movementY * 0.25)
        };
      });
    }
  };

  return (
    <>
      <ResizeDot
        onResize={(e) => handleResize(e, "start")}
        style={{
          top: "50%",
          left: 0,
          transform: "translateY(-50%)",
          cursor: "move",
        }}
      />
      <ResizeDot
        onResize={(e) => handleResize(e, "end")}
        style={{
          top: "50%",
          left: "100%",
          // 5px transform to put dot after arrow
          transform: "translate(5px, -50%)",
          cursor: "move",
        }}
      />
    </>
  );
};
