import { useEffect } from "react";
import { ConnectorNode } from "./components/ConnectorNode/ConnectorNode";
import { Net } from "./components/Net/Net";
import { RectangleNode } from "./components/RectangleNode/RectangleNode";
import { useConnectors, useRectangles } from "./store";

function App() {
  const { initCon, connectors } = useConnectors();
  const { initRect, rectangles } = useRectangles();

  useEffect(() => {
    initCon();
    initRect();
  }, []);

  return (
    <Net>
      {rectangles.map(rect => )}
      <RectangleNode />
      <ConnectorNode />
    </Net>
  );
}

export default App;
