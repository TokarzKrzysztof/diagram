import { Point } from ".";

export interface Connector {
  id: string;
  start: Point;
  end: Point;
  isActive: boolean;
}
