import { useEffect } from "react";
import buttons from "../../helpers/buttons";

function Buttons(props) {
   const { dispatch } = props;

   function handleButtonPress(key) {
      if (buttons.flat().includes(key) || key === "Enter") {
         dispatch({ payload: key });
      }
   }

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
               <div>
                  {symbol === "*" ? (
                     <>&#215;</>
                  ) : symbol === "/" ? (
                     <>&#247;</>
                  ) : symbol === "-" ? (
                     <>&#8722;</>
                  ) : (
                     symbol
                  )}
               </div>
            </div>
         ))}
      </section>
   );
}

export default Buttons;
