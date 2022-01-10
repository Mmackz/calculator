import calculateFontSize from "../../helpers/calculateFontSize";

function Screen({ display, subdisplay }) {
   const displayFontSize = calculateFontSize(display);
   const subdisplayFontSize = calculateFontSize(subdisplay);

   return (
      <div className="screen-container">
         <div className="screen-inner">
            <div className="display">
               <p
                  style={{
                     fontSize: `${
                        subdisplayFontSize * 0.45 < 1
                           ? 1
                           : subdisplayFontSize * 0.45
                     }rem`
                  }}
               >
                  {subdisplay}
               </p>
            </div>
            <div className="display">
               <p style={{ fontSize: `${displayFontSize}rem` }}>{display}</p>
            </div>
         </div>
      </div>
   );
}

export default Screen;
