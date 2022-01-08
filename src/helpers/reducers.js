function reducer(state, action) {
   const { type, payload } = action;

   if (type === "display") {
      // if input is a digit
      if (/\d/.test(payload)) {
         if (state.display === "0") {
            return { ...state, [type]: payload };
         }
         return { ...state, [type]: state.display + payload };
         // if input an operator
      } else if (/[+\-*/]/.test(payload)) {
         // if equation ends with an operator
         if (/[+\-*/]$/.test(state.display)) {
            console.log("gm")
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
