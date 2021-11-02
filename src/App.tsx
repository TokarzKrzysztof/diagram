import { useEffect } from "react";
import { ConnectorNode } from "./components/ConnectorNode/ConnectorNode";
import { Net } from "./components/Net/Net";
import { RectangleNode } from "./components/RectangleNode/RectangleNode";
import { useConnectors, useRectangles } from "./store";

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

  return (
    <>
      <button style={{ display: "block" }}>Save</button>
      <Net>
        {rectangles.map((rect) => (
          <RectangleNode
            onSetActive={() => {
              console.log("active")
              deactivateAll();
              updateRect(rect.id, { ...rect, isActive: true });
            }}
            key={rect.id}
            data={rect}
          />
        ))}
        {connectors.map((con) => (
          <ConnectorNode key={con.id} data={con} />
        ))}
      </Net>
    </>
  );
}

export default App;
