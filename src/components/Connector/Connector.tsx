import { FC, useRef, useState } from "react";
import { ConModel } from "../../models/ConModel";
import { RectResizeDots } from "../Rectangle/RectResizeDots/RectResizeDots";
import { Dragable } from "../shared/Dragable/Dragable";

interface Props {}

export const Connector: FC<Props> = () => {
  const [config, setConfig] = useState<ConModel & { height: number }>({
    top: 150,
    left: 200,
    width: 100,
    height: 100,
    rotate: 0,
  });
  const [isActive, setIsActive] = useState(false);

  const handleUpdatePosition = (top: number, left: number) => {
    setConfig((prev) => {
      return { ...prev, top, left };
    });
  };
  // console.log(width);
  // console.log(height);
  const { width, height } = config;
  return (
    <Dragable
      top={config.top}
      left={config.left}
      onUpdatePosition={handleUpdatePosition}
      onMouseDown={() => setIsActive(true)}
    >
      <svg
        overflow={"visible"}
        // transform={"rotate(90, 0, 0)"}
        width={width}
        height={height}
        style={{
          border: "1px solid white",
        }}
      >
        {/* <text x={"50%"} y={"50%"} fill={"white"} textAnchor={"middle"} dominantBaseline={"middle"} style={{width: 100}} width={100}>Test</text> */}
        <polyline
          points={`0,0 ${width}, ${height}`}
          stroke={"white"}
          strokeWidth={4}
        ></polyline>
        <polygon
          points={`${width},${height} ${width - 2},${height - 15} ${
            width - 15
          },${height - 2}`}
          fill={"white"}
        ></polygon>
        {/* <polygon points={"100,100 100,85 85,100"} fill={"white"}></polygon> */}
        {isActive && <RectResizeDots onSetConfig={setConfig as any} />}
      </svg>
    </Dragable>
  );
};
