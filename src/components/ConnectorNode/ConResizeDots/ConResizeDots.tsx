import { FC, useRef } from "react";
import { Connector, Point } from "../../../types";
import { getDistance, getAngle } from "../../../utils";
import { ResizeDot } from "../../shared";
import { ConDotPlacement } from "../types";

interface Props {
  config: Connector;
  onSetConfig: React.Dispatch<React.SetStateAction<Connector>>;
}

export const ConResizeDots: FC<Props> = ({ onSetConfig, config }) => {
  const handleResize = (e: MouseEvent, placement: ConDotPlacement) => {
    if (placement === "start") {
      onSetConfig((prev) => {
        return {
          ...prev,
          start: {
            x: e.offsetX,
            y: e.offsetY,
          },
        };
      });
    } else {
      onSetConfig((prev) => {
        return {
          ...prev,
          end: {
            x: e.offsetX,
            y: e.offsetY,
          },
        };
      });
    }
  };

  const { start, end } = config;
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
