import { FC, useRef } from "react";
import { ConModel } from "../../../models/ConModel";
import { getAngle, getDistance, Point } from "../../../utils/point-utils";
import { ResizeDot } from "../../shared/ResizeDot/ResizeDot";
import { ConDotPlacement } from "../types";

interface Props {
  onSetConfig: React.Dispatch<React.SetStateAction<ConModel>>;
  connectorRef: React.RefObject<HTMLDivElement>;
}

export const ConResizeDots: FC<Props> = ({ onSetConfig, connectorRef }) => {
  const startDotRef = useRef<HTMLSpanElement>(null);
  const endDotRef = useRef<HTMLSpanElement>(null);

  const getCoordinates = (element: HTMLElement): Point => {
    return {
      x: element.getBoundingClientRect().x,
      y: element.getBoundingClientRect().y,
    };
  };

  const handleResize = (e: MouseEvent, placement: ConDotPlacement) => {
    const conCoordinates = connectorRef.current!.getBoundingClientRect();
    const mousePoint: Point = { x: e.pageX, y: e.pageY };
    const startPoint: Point = {
      x: conCoordinates.left,
      y: conCoordinates.top,
    };
    const endPoint: Point = {
      x: conCoordinates.right,
      y: conCoordinates.bottom,
    };
    // console.log({ startPoint });
    // console.log({ endPoint });
    const prevWidth = getDistance(startPoint, endPoint);
    // console.log({prevWidth})
    // console.log("prevWidth", prevWidth)
    let currentWidth = getDistance(
      mousePoint,
      placement === "start" ? endPoint : startPoint
    );
    // console.log({currentWidth})
    // console.log("currentWidth", currentWidth)
    // console.log(currentWidth > prevWidth);
    // console.log(
    //   "x",
    //   connectorRef.current!.getBoundingClientRect().right,
    //   "y",
    //   connectorRef.current!.getBoundingClientRect().bottom
    // );
    // const mousePoint: Point = { x: e.pageX, y: e.pageY };
    // const secondPoint: Point =
    //   placement === "start"
    //     ? getCoordinates(endDotRef.current as HTMLElement)
    //     : getCoordinates(startDotRef.current as HTMLElement);
    // console.log(e.movementX);
    // console.log(e.movementY);
    const increased = currentWidth > prevWidth;
    let move = Math.sqrt(Math.pow(e.movementX, 2) + Math.pow(e.movementY, 2));
    if (increased === false) move = -move;
    console.log({move})
    console.log({e: e.movementX})
    // console.log(move)
    if (placement === "start") {
      // console.log( getDistance(secondPoint, mousePoint))
      // console.log("previues", getDistance(getCoordinates(startDotRef.current as HTMLElement), getCoordinates(endDotRef.current as HTMLElement)))
      onSetConfig((prev) => {
        return {
          ...prev,
          // width: getDistance(secondPoint, mousePoint),
          width: prev.width - move,
          left: prev.left +  e.movementX,
          top: prev.top + e.movementY,
          rotate: getAngle(mousePoint, endPoint),
        };
      });
    } else {
      onSetConfig((prev) => {
        return {
          ...prev,
          width: prev.width + move,
          rotate: getAngle(startPoint, mousePoint),
        };
      });
    }
  };

  return (
    <>
      <ResizeDot
        onResize={(e) => handleResize(e, "start")}
        style={{
          top: "50%",
          left: 0,
          transform: "translateY(-50%)",
          cursor: "move",
        }}
      />
      <ResizeDot
        onResize={(e) => handleResize(e, "end")}
        style={{
          top: "50%",
          left: "100%",
          // 5px transform to put dot after arrow
          transform: "translate(5px, -50%)",
          cursor: "move",
        }}
      />
    </>
  );
};
