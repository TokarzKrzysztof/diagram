import { FC } from "react";
import { useSVGRoot } from "../../../store";
import { Connector } from "../../../types";
import { ResizeDot } from "../../shared";

interface Props {
  config: Connector;
  onSetConfig: React.Dispatch<React.SetStateAction<Connector>>;
}

export const ConResizeDots: FC<Props> = ({ onSetConfig, config }) => {
  const { getMouseToSvgRelativePosition } = useSVGRoot();

  const handleResize = (e: MouseEvent, placement: "start" | "end") => {
    const { x, y } = getMouseToSvgRelativePosition(e);
    if (placement === "start") {
      onSetConfig((prev) => {
        return {
          ...prev,
          start: {
            x,
            y,
          },
        };
      });
    } else {
      onSetConfig((prev) => {
        return {
          ...prev,
          end: {
            x,
            y,
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
