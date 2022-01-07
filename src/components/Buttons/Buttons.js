function Buttons() {

   const buttons = [
      ["C", "+/-", "%", "/"],
      ["7", "8", "9", "x"],
      ["4", "5", "6", "-"],
      ["1", "2", "3", "+"],
      ["0", ".", "="]
   ];

   return (
      <section className="button-container">
         {buttons.flat().map(symbol => <div className="button">{symbol}</div>)}
      </section>
      
   )
}

export default Buttons;
