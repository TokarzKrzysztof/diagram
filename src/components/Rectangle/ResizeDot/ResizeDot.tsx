import { FC, useEffect, useMemo, useState } from "react";
import styled from "styled-components";
import { DotPlacement, ResizeFn } from "../types";

const StyledResizeDot = styled.span<{}>`
  position: absolute;
  width: 15px;
  height: 15px;
  background-color: white;
  border-radius: 50%;
`;

interface Props {
  onResize: ResizeFn;
  placement: DotPlacement;
}

export const ResizeDot: FC<Props> = ({ onResize, placement }) => {
  const [isMouseDown, setIsMouseDown] = useState(false);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (isMouseDown) {
        onResize(e, placement);
      }
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

  const style: React.CSSProperties = useMemo(() => {
    if (placement === "top-left") {
      return {
        top: 0,
        left: 0,
        transform: "translate(-50%, -50%)",
        cursor: "nw-resize",
      };
    }
    if (placement === "top-right") {
      return {
        top: 0,
        right: 0,
        transform: "translate(50%, -50%)",
        cursor: "ne-resize",
      };
    }
    if (placement === "bottom-left") {
      return {
        bottom: 0,
        left: 0,
        transform: "translate(-50%, 50%)",
        cursor: "sw-resize",
      };
    }
    return {
      bottom: 0,
      right: 0,
      transform: "translate(50%, 50%)",
      cursor: "se-resize",
    };
  }, [placement]);

  return (
    <StyledResizeDot
      onMouseDown={(e) => {
        e.stopPropagation();
        setIsMouseDown(true);
      }}
      style={style}
    />
  );
};
