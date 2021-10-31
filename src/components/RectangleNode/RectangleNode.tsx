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
    top: 0,
    left: 0,
    width: 100,
    height: 50,
    text: "Test",
  });
  const [isActive, setIsActive] = useState(false);
  const [isEditText, setIsEditText] = useState(false);

  const handleUpdatePosition = (top: number, left: number) => {
    setConfig((prev) => {
      return { ...prev, top, left };
    });
  };

  const handleTextEdit = (value: string) => {
    setConfig({ ...config, text: value });
    setIsEditText(false);
  };

  return (
    <Dragable
      y={config.top}
      x={config.left}
      onUpdatePosition={handleUpdatePosition}
      onMouseDown={() => setIsActive(true)}
    >
      <StyledRectangle
        ref={ref}
        style={{ width: config.width, height: config.height }}
        onDoubleClick={() => setIsEditText(!isEditText)}
      >
        <TextNode
          value={config.text}
          isEditing={isEditText}
          onAccept={handleTextEdit}
        />

        {isActive && <RectResizeDots onSetConfig={setConfig} />}
      </StyledRectangle>
    </Dragable>
  );
};
