import { FC, useRef, useState } from "react";
import styled from "styled-components";
import { Rectangle } from "../../types";
import { Dragable } from "../shared";
import { RectResizeDots } from "./RectResizeDots/RectResizeDots";
import { TextNode } from "./TextNode/TextNode";

const StyledRectangle = styled.div`
  border: 1px solid white;
`;

interface Props {}

export const RectangleNode: FC<Props> = () => {
  const ref = useRef<HTMLDivElement>(null);
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
    <Dragable
      onMove={handleMove}
      onMouseDown={() => setIsActive(true)}
    >
      <svg
        x={config.x}
        y={config.y}
        width={config.width}
        height={config.height}
        overflow={"visible"}
      >
        <rect width={"100%"} height={"100%"} stroke={"white"} strokeWidth={2} />
        {isActive && <RectResizeDots config={config} onSetConfig={setConfig} />}
      </svg>
      {/* <StyledRectangle
        ref={ref}
        style={{ width: config.width, height: config.height }}
        onDoubleClick={() => setIsEditText(!isEditText)}
        >
        </StyledRectangle> */}
      {/* <TextNode
          value={config.text}
          isEditing={isEditText}
          onAccept={handleTextEdit}
        /> */}
    </Dragable>
  );
};
