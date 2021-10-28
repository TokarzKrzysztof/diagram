import { CSSProperties, FC, useRef, useState } from "react";
import styled from "styled-components";
import { RectConfig } from "../../models/RectConfig";
import { ResizeDots } from "./ResizeDots/ResizeDots";

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
  console.log("render");

  const handleDrop = () => {};

  const handleDragAndDrop = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    if (!ref.current) return;
    console.log(ref.current.offsetTop);
    console.log(ref.current.offsetLeft);
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
    //   onClick={() => setIsActive(!isActive)}
    >
      {isActive && !isMouseDown && <ResizeDots onResize={() => {}} />}
    </StyledRectangle>
  );
};
