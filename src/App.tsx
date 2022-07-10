import { Characters } from "./Characters/Characters";
import * as stores from "./stores";

function App() {
  return (
    <div className="App">
      <Characters {...stores} />
    </div>
  );
}

export default App;
