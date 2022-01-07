import { useEffect } from "react";
import buttons from "../../helpers/buttons";


function Buttons(props) {
   useEffect(() => {
      window.addEventListener("keypress", (e) => {
         if (buttons.flat().includes(e.key)) {
            console.log(e.key)
         }
      })
      return () => window.removeEventListener("keypress", (e) => {
         if (buttons.flat().includes(e.key)) {
            console.log(e.key)
         }
      })
   }, [])

   return (
      <section className="button-container">
         {buttons.flat().map(symbol => <div key={symbol} className="button" >{symbol}</div>)}
      </section>
      
   )
}

export default Buttons;
