import { BehaviorSubject } from "rxjs";
import { Rectangle } from "../../types";

export const initialState: Rectangle[] = [];
export const store = new BehaviorSubject<Rectangle[]>(initialState);

const getFromStorage = (): Rectangle[] => {
  const json = localStorage.getItem("rectangles");
  return json ? JSON.parse(json) : [];
};

const updateStore = (state: Rectangle[]) => {
  store.next(state);
  localStorage.setItem("rectangles", JSON.stringify(state));
};

export const actions = {
  initRect: () => store.next(getFromStorage()),
  addRect: (data: Rectangle) => store.next([...store.value, data]),
  removeRect: (id: string) => {
    const state = { ...store.value };
    updateStore(state.filter((x) => x.id !== id));
  },
  markAllRectAsUnactive: () => {
    const state = { ...store.value };
    state.forEach((x) => (x.isActive = false));
    updateStore(state);
  },
  updateRect: (id: string, data: Rectangle) => {
    const state = { ...store.value };
    const index = state.findIndex((x) => x.id === id);
    if (index > -1) {
      state[index] = data;
      updateStore(state);
    }
  },
};
