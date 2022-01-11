import calculateFontSize from "../../helpers/calculateFontSize";

function Screen({ display, subdisplay }) {
   const displayFontSize = calculateFontSize(display);
   const subdisplayFontSize = calculateFontSize(subdisplay);

   function formatDisplay(string) {
      const operators = { "*": " × ", "/": " ÷ ", "-": " − ", "+": " + " };
      const addedCommas = string.replace(
         /\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g,
         ","
      );
      return addedCommas.replace(/[+\-*/]/g, (match) => operators[match]);
   }

   return (
      <div className="screen-container">
         <div className="screen-inner">
            <div className="display">
               <p
                  id="sub-display"
                  style={{
                     fontSize: `${
                        subdisplayFontSize * 0.45 < 1
                           ? 1
                           : subdisplayFontSize * 0.45
                     }rem`
                  }}
               >
                  {formatDisplay(subdisplay)}
               </p>
            </div>
            <div className="display">
               <p
                  id="main-display"
                  style={{ fontSize: `${displayFontSize}rem` }}
               >
                  {formatDisplay(display)}
               </p>
            </div>
         </div>
      </div>
   );
}

export default Screen;
