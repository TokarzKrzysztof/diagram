import { FC, useEffect, useState } from "react";
import styled from "styled-components";

interface Props extends React.SVGProps<SVGCircleElement> {
  onResize: (e: MouseEvent) => void;
}

export const ResizeDot: FC<Props> = ({ onResize, ...props }) => {
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
    <circle
      fill={"white"}
      r={8}
      onMouseDown={(e) => {
        e.stopPropagation();
        setIsMouseDown(true);
      }}
      {...props}
    />
  );
};
