import { FC, useEffect, useState } from "react";
import styled from "styled-components";

const StyledResizeDot = styled.span<{}>`
  position: absolute;
  width: 15px;
  height: 15px;
  background-color: white;
  border-radius: 50%;
`;

interface Props {
  onResize: (e: MouseEvent) => void;
  style: React.CSSProperties;
  dotRef?: React.RefObject<HTMLSpanElement>;
}

export const ResizeDot: FC<Props> = ({ onResize, style, dotRef }) => {
  const [isMouseDown, setIsMouseDown] = useState(false);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (isMouseDown) onResize(e);
    };

    window.addEventListener("mousemove", handler);
    return () => {
      window.removeEventListener("mousemove", handler);
    };
  }, [isMouseDown]);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      setIsMouseDown(false);
    };

    window.addEventListener("mouseup", handler);
    return () => {
      window.removeEventListener("mouseup", handler);
    };
  }, []);

  return (
    <StyledResizeDot
      ref={dotRef}
      onMouseDown={(e) => {
        e.stopPropagation();
        setIsMouseDown(true);
      }}
      style={style}
    />
  );
};
