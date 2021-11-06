import { FC } from "react";
import { useSVGRoot } from "../../../store";
import { Connector } from "../../../types";
import { ResizeDot } from "../../shared";

interface Props {
  data: Connector;
  onUpdateCon: (data: Connector) => void;
}

export const ConResizeDots: FC<Props> = ({ data, onUpdateCon }) => {
  const { getMouseToSvgRelativePosition } = useSVGRoot();

  const handleResize = (e: MouseEvent, placement: "start" | "end") => {
    const { x, y } = getMouseToSvgRelativePosition(e);
    const connector = { ...data };

    if (placement === "start") {
      connector.start = { x, y };
    } else {
      connector.end = { x, y };
    }

    onUpdateCon(connector);
  };

  const { start, end } = data;
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
