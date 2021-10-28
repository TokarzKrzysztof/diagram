import { FC, useRef, useState } from "react";
import styled from "styled-components";
import { RectNode } from "../../models/RectConfig";
import { ResizeDot } from "./ResizeDot/ResizeDot";
import { TextNode } from "./TextNode/TextNode";
import { DotPlacement } from "./types";

const StyledRectangle = styled.div<{ active: boolean }>`
  position: absolute;
  width: 100px;
  height: 50px;
  border: 1px solid white;
  cursor: ${({ active }) => (active ? "move" : "default")};
`;

interface Props {}

export const Rectangle: FC<Props> = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [config, setConfig] = useState<RectNode>({
    top: 0,
    left: 0,
    width: 100,
    height: 50,
    text: "Test",
  });
  const [isActive, setIsActive] = useState(false);
  const [isMouseDown, setIsMouseDown] = useState(false);
  const [isEditText, setIsEditText] = useState(false);

  const handleResize = (e: MouseEvent, placement: DotPlacement) => {
    if (placement === "top-left") {
      setConfig((prev) => {
        return {
          ...prev,
          width: prev.width - e.movementX,
          height: prev.height - e.movementY,
          top: prev.top + e.movementY,
          left: prev.left + e.movementX,
        };
      });
    } else if (placement === "top-right") {
      setConfig((prev) => {
        return {
          ...prev,
          width: prev.width + e.movementX,
          height: prev.height - e.movementY,
          top: prev.top + e.movementY,
        };
      });
    } else if (placement === "bottom-left") {
      setConfig((prev) => {
        return {
          ...prev,
          width: prev.width - e.movementX,
          height: prev.height + e.movementY,
          left: prev.left + e.movementX,
        };
      });
    } else {
      setConfig((prev) => {
        return {
          ...prev,
          width: prev.width + e.movementX,
          height: prev.height + e.movementY,
        };
      });
    }
  };

  const handleDrag = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    setConfig((prev) => {
      return {
        ...prev,
        top: prev.top + e.movementY,
        left: prev.left + e.movementX,
      };
    });
  };

  const handleTextEdit = (value: string) => {
    setConfig({ ...config, text: value });
    setIsEditText(false);
  };

  return (
    <StyledRectangle
      ref={ref}
      active={isActive}
      style={config}
      onMouseDown={() => {
        setIsActive(true);
        setIsMouseDown(true);
      }}
      onMouseUp={() => setIsMouseDown(false)}
      onMouseMove={(e) => {
        if (isMouseDown) handleDrag(e);
      }}
      onDoubleClick={() => setIsEditText(!isEditText)}
    >
      <TextNode
        value={config.text}
        isEditing={isEditText}
        onAccept={handleTextEdit}
      />

      {isActive && !isMouseDown && (
        <>
          <ResizeDot placement={"top-left"} onResize={handleResize} />
          <ResizeDot placement={"top-right"} onResize={handleResize} />
          <ResizeDot placement={"bottom-left"} onResize={handleResize} />
          <ResizeDot placement={"bottom-right"} onResize={handleResize} />
        </>
      )}
    </StyledRectangle>
  );
};
