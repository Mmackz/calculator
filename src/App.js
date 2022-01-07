import { useReducer } from "react";
import { evaluate, format } from "mathjs";
import Buttons from "./components/Buttons/Buttons";
import Screen from "./components/Screen/Screen";
import reducer from "./helpers/reducers";

const options = {
   precision: 9,
   upperExp: 12
}

function App() {
   const initialState = {
      equation: "",
      answer: "",
      operator: ""
   };

   const state = useReducer(reducer, initialState)

   function evaluateExpression() {
      const ans = format(evaluate(state.equation), options);
      console.log(ans);
   }

   function handlePress(e) {
      console.log(e.key)
   }

   return (
      <main className="main-container">
         <Screen equation={state.equation} />
         <Buttons handlePress={handlePress} />
      </main>
   );
}

export default App;
