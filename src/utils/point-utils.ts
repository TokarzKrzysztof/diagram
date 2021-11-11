import { Point } from "../types";
import _ from "lodash";

export const getDistance = (a: Point, b: Point): number => {
  const differenceX = a.x - b.x;
  const differenceY = a.y - b.y;

  const result = Math.sqrt(Math.pow(differenceX, 2) + Math.pow(differenceY, 2));
  return result;
};

export const getNearestPoint = (from: Point, targets: Point[]): Point => {
  const closest = targets.reduce((prev, current) => {
    const prevDist = getDistance(from, prev);
    const currentDist = getDistance(from, current);
    return currentDist < prevDist ? current : prev;
  }, targets[0]);

  return closest;
};

// const radiansToDegress = (radians: number) => radians * (180 / Math.PI);

// export const getAngle = (a: Point, b: Point) => {
//   let quarter: "top-left" | "top-right" | "bottom-left" | "bottom-right";
//   const differenceX = a.x - b.x;
//   const differenceY = a.y - b.y;
//   if (differenceX < 0 && differenceY < 0) quarter = "bottom-right";
//   else if (differenceX > 0 && differenceY < 0) quarter = "bottom-left";
//   else if (differenceX > 0 && differenceY > 0) quarter = "top-left";
//   else quarter = "top-right";
//   const sinAngle = Math.abs(differenceY) / getDistance(a, b);

//   const result = radiansToDegress(Math.asin(sinAngle));
//   if (quarter === "bottom-left") return 180 - result;
//   if (quarter === "top-left") return 180 + result;
//   if (quarter === "top-right") return 360 - result;
//   return result;
// };
