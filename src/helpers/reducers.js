function reducer(state, action) {
   const { type, payload } = action;

   if (type === "display") {
      if (payload === "C") {
         return { display: "0", subdisplay: "" };
      }

      if (payload === "+/-") {
         // if equation ends with an operator
         if (/[+\-*/]$/.test(state.display)) {
            return state;
         }
         const lastNumber = state.display.match(/-?[\d.%]{0,}(?!.*\d)/);
         const flippedNum = -parseFloat(lastNumber)

         console.log(lastNumber, "lastnum")
         
         return { ...state, display: state.display.slice(0, lastNumber.index ? lastNumber.index : 0) + flippedNum }
         
      }

      // if input is a digit
      if (/\d/.test(payload)) {
         if (state.display === "0") {
            return { ...state, [type]: payload };
         }
         return { ...state, [type]: state.display + payload };
         // if input an operator
      }
      if (/[+\-*/]/.test(payload)) {
         // if equation ends with an operator
         if (/[+\-*/]$/.test(state.display)) {
            return { ...state, [type]: state.display.slice(0, -1) + payload };
         }
         return { ...state, [type]: state.display + payload };
      }
      return state;
   } else {
      return state;
   }
}

export default reducer;
