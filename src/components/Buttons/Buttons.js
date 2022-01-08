import { useEffect, useRef } from "react";
import { evaluate, format } from "mathjs";
import buttons from "../../helpers/buttons";

const options = {
   precision: 9,
   upperExp: 12
};

function Buttons(props) {
   const { state, dispatch } = props;

   const ref = useRef(state)

   function evaluateExpression() {
      console.log("evaluating")
      console.log(ref.current.display);
      const ans = format(evaluate(ref.current.display), options);
      console.log(ans);
   }

   useEffect(() => {
      ref.current = state
   }, [state])

   useEffect(() => {
      function handleKeypress(e) {
         if (buttons.flat().includes(e.key)) {
            if (e.key === "=") {
               console.log("calculating...");
               evaluateExpression()
            }
            dispatch({ type: "display", payload: e.key });
         }
      }

      window.addEventListener("keypress", handleKeypress);
      return () => window.removeEventListener("keypress", handleKeypress);
   }, []);

   return (
      <section className="button-container">
         {buttons.flat().map((symbol) => (
            <div key={symbol} className="button">
               {symbol}
            </div>
         ))}
      </section>
   );
}

export default Buttons;
