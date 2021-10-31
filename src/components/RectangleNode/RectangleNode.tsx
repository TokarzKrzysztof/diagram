import { FC, useState } from "react";
import { Rectangle } from "../../types";
import { Dragable } from "../shared";
import { RectResizeDots } from "./RectResizeDots/RectResizeDots";
import { TextNode } from "./TextNode/TextNode";

interface Props {}

export const RectangleNode: FC<Props> = () => {
  const [config, setConfig] = useState<Rectangle>({
    y: 0,
    x: 0,
    width: 100,
    height: 50,
    text: "Test",
  });
  const [isActive, setIsActive] = useState(false);
  const [isEditText, setIsEditText] = useState(false);

  const handleMove = (e: MouseEvent) => {
    setConfig((prev) => {
      return { ...prev, y: prev.y + e.movementY, x: prev.x + e.movementX };
    });
  };

  const handleTextEdit = (value: string) => {
    setConfig({ ...config, text: value });
    setIsEditText(false);
  };

  return (
    <Dragable onMove={handleMove} onMouseDown={() => setIsActive(true)}>
      <svg
        x={config.x}
        y={config.y}
        width={config.width}
        height={config.height}
        overflow={"visible"}
      >
        <rect width={"100%"} height={"100%"} stroke={"white"} strokeWidth={2} />
        {/* <text fill={"white"} x={"50%"} y={"50%"}>Test</text> */}
          <TextNode
            value={config.text}
            isEditing={isEditText}
            onAccept={handleTextEdit}
          />
        <foreignObject fill={"white"} width={"100%"} height={"100%"}>
        </foreignObject>
        {isActive && <RectResizeDots config={config} onSetConfig={setConfig} />}
      </svg>
      {/* <StyledRectangle
        ref={ref}
        style={{ width: config.width, height: config.height }}
        onDoubleClick={() => setIsEditText(!isEditText)}
        >
        </StyledRectangle> */}
      {/*  */}
    </Dragable>
  );
};
