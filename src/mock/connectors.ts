import { Connector } from "../types";
import { v4 } from "uuid";

export const connectorsMock: Connector[] = [
  {
    id: v4(),
    start: {
      x: 100,
      y: 200,
    },
    end: {
      x: 300,
      y: 100,
    },
    isActive: false,
  },
];
