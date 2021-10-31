import { Point } from "../types";

export const getDistance = (a: Point, b: Point): number => {
  const differenceX = a.x - b.x;
  const differenceY = a.y - b.y;

  const result = Math.sqrt(Math.pow(differenceX, 2) + Math.pow(differenceY, 2));
  return result;
};

const radiansToDegress = (radians: number) => radians * (180 / Math.PI);

export const getAngle = (a: Point, b: Point) => {
  let quarter: "top-left" | "top-right" | "bottom-left" | "bottom-right";
  const differenceX = a.x - b.x;
  const differenceY = a.y - b.y;
  if (differenceX < 0 && differenceY < 0) quarter = "bottom-right";
  else if (differenceX > 0 && differenceY < 0) quarter = "bottom-left";
  else if (differenceX > 0 && differenceY > 0) quarter = "top-left";
  else quarter = "top-right";
  // sin alfa (angle) = absolute(difY) / distance between points
  const sinAngle = Math.abs(differenceY) / getDistance(a, b);

  // console.log(angle)
  const result = radiansToDegress(Math.asin(sinAngle));
  // console.log(result)
  if (quarter === "bottom-left") return 180 - result;
  if (quarter === "top-left") return 180 + result;
  if (quarter === "top-right") return 360 - result;
  return result;
  // if (quarter === "bottom-right") return result;
  // if (quarter === "top-left") return result + 180;
  // return result + 270;
};
