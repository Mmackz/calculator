import { useEffect } from "react";
import buttons from "../../helpers/buttons";

function Buttons(props) {
   const { dispatch } = props;

   function handleButtonPress(key) {
      if (buttons.some(button => button.symbol === key) || key === "Enter") {
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
         {buttons.map((button) => (
            <div
               key={button.id}
               className="button"
               id={button.id}
               onClick={() => handleButtonPress(button.symbol)}
            >
               <div>
                  {button.symbol === "*" ? (
                     <>&#215;</>
                  ) : button.symbol === "/" ? (
                     <>&#247;</>
                  ) : button.symbol === "-" ? (
                     <>&#8722;</>
                  ) : (
                     button.symbol
                  )}
               </div>
            </div>
         ))}
      </section>
   );
}

export default Buttons;
