import { FC, useEffect, useState } from "react";
import { useConnectors } from "../../store";
import { Connector } from "../../types";
import { Dragable } from "../shared";
import { ConResizeDots } from "./ConResizeDots/ConResizeDots";

interface Props {
  data: Connector;
}

export const ConnectorNode: FC<Props> = ({ data }) => {
  const { updateCon } = useConnectors();
  const [config, setConfig] = useState<Connector>(data);

  useEffect(() => {
    setConfig(data);
    return () => updateCon(data.id, config);
  }, [data]);

  const handleMove = (e: MouseEvent) => {
    setConfig((prev) => {
      const { start, end } = prev;
      return {
        ...prev,
        start: {
          x: start.x + e.movementX,
          y: start.y + e.movementY,
        },
        end: {
          x: end.x + e.movementX,
          y: end.y + e.movementY,
        },
      };
    });
  };

  const { start, end } = config;
  return (
    <Dragable
      onMove={handleMove}
      onMouseDown={() => setConfig({ ...config, isActive: true })}
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
        markerEnd="url(#arrow)"
      ></line>

      {config.isActive && (
        <ConResizeDots config={config} onSetConfig={setConfig} />
      )}
    </Dragable>
  );
};
