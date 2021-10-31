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

  const handleUpdatePosition = (y: number, x: number) => {
    setConfig((prev) => {
      return { ...prev, y, x };
    });
  };

  const handleTextEdit = (value: string) => {
    setConfig({ ...config, text: value });
    setIsEditText(false);
  };

  return (
    <Dragable
      y={config.y}
      x={config.x}
      onUpdatePosition={handleUpdatePosition}
      onMouseDown={() => setIsActive(true)}
    >
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
      <rect
        x={config.x}
        y={config.y}
        width={config.width}
        height={config.height}
        stroke={"white"}
        strokeWidth={2}
      />
      {isActive && <RectResizeDots config={config} onSetConfig={setConfig} />}
    </Dragable>
  );
};
