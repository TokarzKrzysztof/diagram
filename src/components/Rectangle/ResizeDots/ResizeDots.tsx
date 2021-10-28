import { FC, useState } from "react";
import styled from "styled-components";
import { RectConfig } from "../../../models/RectConfig";

const StyledResizeDot = styled.span<{}>`
  position: absolute;
  width: 15px;
  height: 15px;
  background-color: white;
  border-radius: 50%;
`;

interface Props {
  onResize: (size: any) => void;
}

export const ResizeDots: FC<Props> = () => {
  const [isMouseDown, setIsMouseDown] = useState(false);

  const handleResize = (e: React.MouseEvent<HTMLSpanElement, MouseEvent>) => {
    console.log(e)
    // console.log("x", e.pageX)
    // console.log("y", e.pageY)
  };

  return (
    <>
      <StyledResizeDot
        onMouseDown={(e) => {
          e.stopPropagation();
          setIsMouseDown(true);
        }}
        onMouseUp={(e) => {
          e.stopPropagation();
          setIsMouseDown(false);
        }}
        onMouseMove={(e) => {
          e.stopPropagation();
          handleResize(e);
        }}
        style={{
          top: 0,
          left: 0,
          transform: "translate(-50%, -50%)",
          cursor: "nw-resize",
        }}
      />
      <StyledResizeDot
        style={{ top: 0, right: 0, transform: "translate(50%, -50%)" }}
      />
      <StyledResizeDot
        style={{ bottom: 0, left: 0, transform: "translate(-50%, 50%)" }}
      />
      <StyledResizeDot
        style={{ bottom: 0, right: 0, transform: "translate(50%, 50%)" }}
      />
    </>
  );
};
