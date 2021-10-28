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

  const handleResize = (e: React.MouseEvent<HTMLSpanElement, MouseEvent>) => {
    if (!ref.current) return;
    // let resizeY = e.pageY - (ref.current.offsetTop + config.height);
    // let resizeX = e.pageX - (ref.current.offsetLeft + config.width);
    // console.log(resizeY);
    // console.log(resizeX);
    console.log("1.", `x - ${ref.current.offsetLeft}`, `y - ${ref.current.offsetHeight}`)
    console.log("2.", `x - ${ref.current.offsetLeft + config.width}`, `y - ${ref.current.offsetHeight}`)
    console.log("3.", `x - ${ref.current.offsetLeft}`, `y - ${ref.current.offsetHeight + config.height}`)
    console.log("4.", `x - ${ref.current.offsetLeft + config.width}`, `y - ${ref.current.offsetHeight + config.height}`)

    // if (resizeY < 0) resizeY = Math.abs(resizeY + config.height);
    // if (resizeX < 0) resizeX = Math.abs(resizeX + config.width);
    // console.log(resizeY)
    // console.log(ref.current.offsetTop, ref.current.offsetLeft);
    // console.log(e.pageY, e.pageX)
    // console.log(e.pageY - (ref.current.offsetTop + config.height));
    // const differenceY = e.pageY - ref.current.offsetTop;
    // const differenceX = e.pageX - ref.current.offsetLeft;
    // console.log(differenceY)
    // console.log(differenceX)
    // console.log(ref.current.offsetLeft);
    //  setConfig((prev) => {
    //   return {
    //     ...prev,
    //     width: prev.width + resizeX,
    //     height: prev.height + resizeY,
    //   };
    // });
  };

  const handleDragAndDrop = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    if (!ref.current) return;
    // console.log(ref.current.offsetTop);
    // console.log(ref.current.offsetLeft);
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
      {isActive && !isMouseDown && <ResizeDots onResize={handleResize} />}
    </StyledRectangle>
  );
};
