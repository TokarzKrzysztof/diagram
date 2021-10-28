import { FC, ReactNode, useEffect, useState } from "react";
import styled from "styled-components";

const StyledDiv = styled.div`
  position: absolute;
`;

interface Props {
  children: ReactNode;
  top: number;
  left: number;
  onUpdatePosition: (top: number, left: number) => void;
  onMouseDown?: React.MouseEventHandler<HTMLDivElement>;
}

export const Dragable: FC<Props> = ({
  children,
  top,
  left,
  onUpdatePosition,
  onMouseDown,
}) => {
  const [isMouseDown, setIsMouseDown] = useState(false);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      setIsMouseDown(false);
    };

    window.addEventListener("mouseup", handler);
    return () => {
      window.removeEventListener("mouseup", handler);
    };
  }, []);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (isMouseDown) onUpdatePosition(top + e.movementY, left + e.movementX);
    };

    window.addEventListener("mousemove", handler);
    return () => {
      window.removeEventListener("mousemove", handler);
    };
  }, [isMouseDown, left, top]);

  return (
    <StyledDiv
      style={{ top, left, cursor: "move" }}
      // onMouseMove={(e) => isMouseDown && handleDrag(e)}
      onMouseDown={(e) => {
        setIsMouseDown(true);
        onMouseDown && onMouseDown(e);
      }}
    >
      {children}
    </StyledDiv>
  );
};
