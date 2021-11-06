import React from "react";
import { BehaviorSubject } from "rxjs";

export const initialState: SVGSVGElement | null = null;

export const store = new BehaviorSubject<SVGSVGElement | null>(initialState);

export const actions = {
  setSVG: (data: SVGSVGElement) => store.next(data),
};
