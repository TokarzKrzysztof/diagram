import { FC, ReactNode, useEffect, useState } from "react";

interface Props {
  children: ReactNode;
  y: number;
  x: number;
  onUpdatePosition: (y: number, x: number) => void;
  onMouseDown?: React.MouseEventHandler<SVGElement>;
}

export const Dragable: FC<Props> = ({
  children,
  y,
  x,
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
      if (isMouseDown) onUpdatePosition(y + e.movementY, x + e.movementX);
    };

    window.addEventListener("mousemove", handler);
    return () => {
      window.removeEventListener("mousemove", handler);
    };
  }, [isMouseDown, x, y]);

  return (
    <g
      y={y}
      x={x}
      style={{ cursor: "move" }}
      onMouseDown={(e) => {
        setIsMouseDown(true);
        onMouseDown && onMouseDown(e);
      }}
    >
      {children}
    </g>
  );
};
