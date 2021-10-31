import { FC, useState } from "react";
import { Connector } from "../../types";
import { Dragable } from "../shared";
import { ConResizeDots } from "./ConResizeDots/ConResizeDots";

interface Props {}

export const ConnectorNode: FC<Props> = () => {
  const [config, setConfig] = useState<Connector>({
    start: { x: 100, y: 100 },
    end: { x: 200, y: 100 },
  });
  const [isActive, setIsActive] = useState(false);

  const handleUpdatePosition = (y: number, x: number) => {
    const diffX = config.start.x - config.end.x;
    const diffY = config.start.y - config.end.y;
    setConfig((prev) => {
      return {
        ...prev,
        start: { x, y },
        end: { x: x - diffX, y: y - diffY },
      };
    });
  };

  const { start, end } = config;
  return (
    <Dragable
      y={start.y}
      x={start.x}
      onUpdatePosition={handleUpdatePosition}
      onMouseDown={() => setIsActive(true)}
    >
      {/* arrow */}
      <marker
        refY={2}
        refX={3}
        markerWidth={6}
        markerHeight={6}
        id="arrow"
        orient="auto"
      >
        <polygon points="0 0, 0 4, 4 2" fill={"white"} />
      </marker>
      {/* line */}
      <line
        x1={start.x}
        y1={start.y}
        x2={end.x}
        y2={end.y}
        stroke={"white"}
        strokeWidth={4}
        marker-end="url(#arrow)"
      ></line>

      {isActive && <ConResizeDots config={config} onSetConfig={setConfig} />}
    </Dragable>
  );
};
