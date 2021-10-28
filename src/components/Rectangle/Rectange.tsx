import { CSSProperties, FC, useRef, useState } from "react";
import styled from "styled-components";
import { RectConfig } from "../../models/RectConfig";
import { ResizeDot } from "./ResizeDot/ResizeDot";
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
  const [config, setConfig] = useState<RectConfig>({
    top: 0,
    left: 0,
    width: 100,
    height: 50,
  });
  const [isActive, setIsActive] = useState(false);
  const [isMouseDown, setIsMouseDown] = useState(false);

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

  const handleDragAndDrop = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    setConfig((prev) => {
      return {
        ...prev,
        top: prev.top + e.movementY,
        left: prev.left + e.movementX,
      };
    });
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
        if (isMouseDown) handleDragAndDrop(e);
      }}
    >
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
