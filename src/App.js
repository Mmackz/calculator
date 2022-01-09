import { useReducer } from "react";
import Buttons from "./components/Buttons/Buttons";
import Screen from "./components/Screen/Screen";
import reducer from "./helpers/reducers";

function App() {
   const initialState = {
      display: "0",
      subdisplay : "",
      evaluatedLastInput: false
   };

   const [state, dispatch] = useReducer(reducer, initialState);

   return (
      <main className="main-container">
         <Screen display={state.display} subdisplay={state.subdisplay} />
         <Buttons state={state} dispatch={dispatch} />
      </main>
   );
}

export default App;
