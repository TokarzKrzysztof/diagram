import { Connector } from ".";

export interface RectConnector {
  position: "start" | "end";
  conId: string;
}

export interface Rectangle {
  id: string;
  y: number;
  x: number;
  width: number;
  height: number;
  text: string;
  isActive: boolean;
  connectors: RectConnector[];
}
