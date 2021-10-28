import { Connector } from "./components/Connector/Connector";
import { Net } from "./components/Net/Net";
import { Rectangle } from "./components/Rectangle/Rectange";

function App() {
  return (
    <Net>
      <Rectangle />
      <Connector />
    </Net>
  );
}

export default App;
