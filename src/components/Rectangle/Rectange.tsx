import { FC, useRef, useState } from "react";
import styled from "styled-components";
import { RectModel } from "../../models/RectModel";
import { Dragable } from "../shared/Dragable/Dragable";
import { RectResizeDots } from "./RectResizeDots/RectResizeDots";
import { TextNode } from "./TextNode/TextNode";

const StyledRectangle = styled.div`
  border: 1px solid white;
`;

interface Props {}

export const Rectangle: FC<Props> = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [config, setConfig] = useState<RectModel>({
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
      top={config.top}
      left={config.left}
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
