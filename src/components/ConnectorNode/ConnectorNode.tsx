import { FC, useState } from "react";
import { Connector } from "../../types";
import { RectResizeDots } from "../RectangleNode/RectResizeDots/RectResizeDots";
import { Dragable, ResizeDot } from "../shared";
import { ConResizeDots } from "./ConResizeDots/ConResizeDots";

interface Props {}

export const ConnectorNode: FC<Props> = () => {
  const [config, setConfig] = useState<Connector>({
    start: { x: 100, y: 100 },
    end: { x: 200, y: 200 },
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
  // console.log(width);
  // console.log(height);
  // const { width, height } = config;
  const { start, end } = config;
  return (
    <>
      <Dragable
        y={start.y}
        x={start.x}
        onUpdatePosition={handleUpdatePosition}
        onMouseDown={() => setIsActive(true)}
      >
        <polyline
          style={{ cursor: "move" }}
          points={`${start.x},${start.y} ${end.x}, ${end.y}`}
          stroke={"white"}
          strokeWidth={4}
        ></polyline>
        {isActive && <ConResizeDots config={config} onSetConfig={setConfig} />}
      </Dragable>
      {/* </g> */}
      {/* <Dragable
        top={config.start.x}
        left={config.start.y}
        onUpdatePosition={handleUpdatePosition}
        onMouseDown={() => setIsActive(true)}
      > */}
      {/* <svg overflow={"visible"}> */}
      {/* 
        <polyline
          points={`${start.x},${start.y} ${end.x}, ${end.y}`}
          stroke={"white"}
          strokeWidth={4}
        ></polyline> */}
      {/* </svg> */}
      {/* <svg
        overflow={"visible"}
        // transform={"rotate(90, 0, 0)"}
        width={width}
        height={height}
        style={{
          border: "1px solid white",
        }}
      > */}
      {/* <text x={"50%"} y={"50%"} fill={"white"} textAnchor={"middle"} dominantBaseline={"middle"} style={{width: 100}} width={100}>Test</text> */}

      {/* <polygon
          points={`${width},${height} ${width - 2},${height - 15} ${
            width - 15
          },${height - 2}`}
          fill={"white"}
        ></polygon> */}
      {/* <polygon points={"100,100 100,85 85,100"} fill={"white"}></polygon> */}
      {/* {isActive && <RectResizeDots onSetConfig={setConfig as any} />} */}
      {/* </svg> */}
      {/* </Dragable> */}
    </>
  );
};
