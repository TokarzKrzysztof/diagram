import { useCallback, useEffect, useMemo } from "react";
import { ConnectorNode } from "./components/ConnectorNode/ConnectorNode";
import { Net } from "./components/Net/Net";
import { RectangleNode } from "./components/RectangleNode/RectangleNode";
import { useConnectors, useRectangles } from "./store";
import { Rectangle } from "./types";

function App() {
  const { initCon, updateCon, markAllConAsUnactive, connectors } =
    useConnectors();
  const { initRect, updateRect, markAllRectAsUnactive, rectangles } =
    useRectangles();

  const deactivateAll = () => {
    markAllConAsUnactive();
    markAllRectAsUnactive();
  };

  useEffect(() => {
    initCon();
    initRect();
  }, []);

  const handleSetActive = useCallback((rect: Rectangle) => {
    deactivateAll();
    updateRect(rect.id, { ...rect, isActive: true });
  }, []);

  return (
    <>
      <button style={{ display: "block" }}>Save</button>
      <div style={{}}>
        <Net>
          {rectangles.map((rect) => (
            <RectangleNode onSetActive={handleSetActive} key={rect.id} data={rect} />
          ))}
          {connectors.map((con) => (
            <ConnectorNode key={con.id} data={con} />
          ))}
        </Net>
      </div>
    </>
  );
}

export default App;
