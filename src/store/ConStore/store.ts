import { BehaviorSubject } from "rxjs";
import { connectorsMock } from "../../mock";
import { Connector } from "../../types";

export const initialState: Connector[] = [];
export const store = new BehaviorSubject<Connector[]>(initialState);

const getFromStorage = (): Connector[] => {
  const json = localStorage.getItem("connectors");
  return json ? JSON.parse(json) : connectorsMock;
};

const updateStore = (state: Connector[]) => {
  store.next(state);
  localStorage.setItem("connectors", JSON.stringify(state));
};

export const actions = {
  initCon: () => store.next(getFromStorage()),
  addCon: (data: Connector) => store.next([...store.value, data]),
  removeCon: (id: string) => {
    const state = [...store.value];
    updateStore(state.filter((x) => x.id !== id));
  },
  markAllConAsUnactive: () => {
    const state = [...store.value];
    state.forEach((x, i) => {
      if (x.isActive) {
        // make rerender
        state[i] = { ...x, isActive: false };
      }
    });
    updateStore(state);
  },
  updateCon: (id: string, data: Connector) => {
    const state = [...store.value];
    const index = state.findIndex((x) => x.id === id);
    if (index > -1) {
      state[index] = data;
      updateStore(state);
    }
  },
};
