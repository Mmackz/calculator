import { useEffect, useRef } from "react";
import buttons from "../../helpers/buttons";

function Buttons(props) {
   const { state, dispatch } = props;

   // const ref = useRef(state);

   function handleButtonPress(key) {
      console.log(key);
      if (buttons.flat().includes(key) || key === "Enter") {
         // if (key === "=" || key === "Enter") {
         //    console.log("calculating...");
         //    evaluateExpression();
         // }
         dispatch({ type: "display", payload: key });
      }
   }

   // useEffect(() => {
   //    ref.current = state;
   // }, [state]);

   useEffect(() => {
      window.addEventListener("keydown", (e) => handleButtonPress(e.key));
      return () =>
         window.removeEventListener("keydown", (e) => handleButtonPress(e.key));
   // eslint-disable-next-line react-hooks/exhaustive-deps
   }, []);

   return (
      <section className="button-container">
         {buttons.flat().map((symbol) => (
            <div
               key={symbol}
               className="button"
               onClick={() => handleButtonPress(symbol)}
            >
               {symbol === "*" ? "x" : symbol}
            </div>
         ))}
      </section>
   );
}

export default Buttons;
