import { useCallback, useEffect } from "react";
import { ConnectorNode } from "./components/ConnectorNode/ConnectorNode";
import { Net } from "./components/Net/Net";
import { RectangleNode } from "./components/RectangleNode/RectangleNode";
import {
  useConnectorsActions,
  useConnectorsState,
  useRectanglesActions,
  useRectanglesState,
} from "./store";
import { Connector, Rectangle } from "./types";

function App() {
  const { connectors } = useConnectorsState();
  const { rectangles } = useRectanglesState();

  const { initRect, updateRect, markAllRectAsUnactive } =
    useRectanglesActions();
  const { initCon, updateCon, markAllConAsUnactive } = useConnectorsActions();

  useEffect(() => {
    initCon();
    initRect();
  }, []);

  const deactivateAll = () => {
    markAllConAsUnactive();
    markAllRectAsUnactive();
  };

  const handleSetRectActive = useCallback((el: Rectangle) => {
    deactivateAll();
    updateRect(el.id, { ...el, isActive: true });
  }, []);

  const handleSetConActive = useCallback((el: Connector) => {
    deactivateAll();
    updateCon(el.id, { ...el, isActive: true });
  }, []);

  return (
    <>
      <button style={{ display: "block" }}>Save</button>
      <div style={{}}>
        <Net>
          {rectangles.map((rect) => (
            <RectangleNode
              onSetActive={handleSetRectActive}
              key={rect.id}
              data={rect}
            />
          ))}
          {connectors.map((con) => (
            <ConnectorNode
              onSetActive={handleSetConActive}
              key={con.id}
              data={con}
            />
          ))}
        </Net>
      </div>
    </>
  );
}

export default App;
