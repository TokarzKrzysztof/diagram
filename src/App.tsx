import { ConnectorNode } from "./components/ConnectorNode/ConnectorNode";
import { Net } from "./components/Net/Net";
import { RectangleNode } from "./components/RectangleNode/RectangleNode";

function App() {
  return (
    <Net>
      <RectangleNode />
      <ConnectorNode />
    </Net>
  );
}

export default App;
