import { FC } from "react";
import { ResizeDot } from "./ResizeDot/ResizeDot";

interface Props {
  onResize: (e: React.MouseEvent<HTMLSpanElement, MouseEvent>) => void;
}

export const ResizeDots: FC<Props> = ({ onResize }) => {
  return (
    <>
      <ResizeDot
        positionStyle={{
          top: 0,
          left: 0,
          transform: "translate(-50%, -50%)",
          cursor: "nw-resize",
        }}
        onResize={onResize}
      />
      <ResizeDot
        positionStyle={{
          top: 0,
          right: 0,
          transform: "translate(50%, -50%)",
          cursor: "ne-resize",
        }}
        onResize={onResize}
      />
      <ResizeDot
        positionStyle={{
          bottom: 0,
          left: 0,
          transform: "translate(-50%, 50%)",
          cursor: "sw-resize",
        }}
        onResize={onResize}
      />
      <ResizeDot
        positionStyle={{
          bottom: 0,
          right: 0,
          transform: "translate(50%, 50%)",
          cursor: "se-resize",
        }}
        onResize={onResize}
      />
    </>
  );
};
