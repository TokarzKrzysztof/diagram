import { FC, ReactNode, useEffect, useState } from "react";

interface Props {
  children: ReactNode;
  onMove: (e: MouseEvent) => void;
  onMouseDown?: React.MouseEventHandler<SVGElement>;
}

export const Dragable: FC<Props> = ({
  children,
  onMove,
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
      if (isMouseDown) onMove(e);
    };

    window.addEventListener("mousemove", handler);
    return () => {
      window.removeEventListener("mousemove", handler);
    };
  }, [isMouseDown]);

  return (
    <g
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
