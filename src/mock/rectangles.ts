import { Rectangle } from "../types";
import { v4 } from "uuid";

export const rectanglesMock: Rectangle[] = [
  {
    id: v4(),
    x: 0,
    y: 0,
    width: 100,
    height: 100,
    text: "First",
    isActive: false,
  },
  {
    id: v4(),
    x: 100,
    y: 200,
    width: 100,
    height: 50,
    text: "Second",
    isActive: false,
  },
  {
    id: v4(),
    x: 200,
    y: 200,
    width: 150,
    height: 50,
    text: "Third",
    isActive: false,
  },
  {
    id: v4(),
    x: 300,
    y: 200,
    width: 100,
    height: 50,
    text: "Forth",
    isActive: false,
  },
  {
    id: v4(),
    x: 50,
    y: 400,
    width: 100,
    height: 50,
    text: "Fifth",
    isActive: false,
  },
];
