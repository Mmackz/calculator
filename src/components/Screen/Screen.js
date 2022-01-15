import calculateFontSize from "../../helpers/calculateFontSize";

function Screen({ display, subdisplay }) {
   const displayFontSize = calculateFontSize(formatDisplay(display));
   const subdisplayFontSize = calculateFontSize(formatDisplay(display));

   function formatDisplay(string) {
      const operators = { "*": " × ", "/": " ÷ ", "-": " − ", "+": " + " };

      function addCommas(match) {
         const addedCommas = match.replace(/^\d{4,}/, (m) => {
            return m.replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
         });
         return addedCommas;
      }

      const numbers = string.replace(/\d+\.?\d+/g, (match) => addCommas(match));

      return numbers
         .replace(/[+\-*/]/g, (match) => operators[match])
         .replace(/e\s\+\s/, "e⁺");
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
