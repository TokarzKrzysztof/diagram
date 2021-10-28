import { FC, useMemo } from "react";
import { ResizeDot } from "../../shared/ResizeDot/ResizeDot";
import { ConDotPlacement, ConResizeFn } from "../types";

interface Props {
  onResize: ConResizeFn;
  placement: ConDotPlacement;
}

export const ConResizeDot: FC<Props> = ({ onResize, placement }) => {
  const style: React.CSSProperties = useMemo(() => {
    // if (placement === "top-left") {
    //   return {
    //     top: 0,
    //     left: 0,
    //     transform: "translate(-50%, -50%)",
    //     cursor: "nw-resize",
    //   };
    // }
    // if (placement === "top-right") {
    //   return {
    //     top: 0,
    //     right: 0,
    //     transform: "translate(50%, -50%)",
    //     cursor: "ne-resize",
    //   };
    // }
    // if (placement === "bottom-left") {
    //   return {
    //     bottom: 0,
    //     left: 0,
    //     transform: "translate(-50%, 50%)",
    //     cursor: "sw-resize",
    //   };
    // }
    return {
      bottom: 0,
      right: 0,
      transform: "translate(50%, 50%)",
      cursor: "se-resize",
    };
  }, [placement]);

  return <ResizeDot onResize={(e) => onResize(e, placement)} style={style} />;
};
