import { evaluate, format } from "mathjs";

const options = {
   precision: 12,
   upperExp: 12
};

function reducer(state, action) {
   const { type, payload } = action;

   function evaluateExpression() {
      console.log("evaluating");
      console.log(state.display);
      const ans = format(evaluate(state.display), options);
      console.log(ans);
      return ans;
   }

   if (type === "display") {
      if (payload === "=" || payload === "Enter") {
         const ans = evaluateExpression();
         return { ...state, display: ans, subdisplay: state.display, evaluatedLastInput: true };
      }

      if (payload === "C") {
         return { display: "0", subdisplay: "", evaluatedLastInput: false };
      }

      if (payload === "+/-") {
         // if equation ends with an operator
         if (/[+\-*/]$/.test(state.display)) {
            return state;
         }
         const lastNumberMatch = state.display.match(/-?[\d.%]{0,}(?!.*\d)/);
         const lastNumber = -parseFloat(lastNumberMatch);
         const flippedNum = lastNumberMatch[0].endsWith("%")
            ? lastNumber + "%"
            : lastNumber;

         return {
            ...state,
            display:
               state.display.slice(0, lastNumber.index ? lastNumber.index : 0) +
               flippedNum
         };
      }

      if (payload === ".") {
         // if last input does not contain a decimal point
         if (!/\.\d*(?!.*[\d+\-/*])/.test(state.display)) {
            return { ...state, display: state.display + "." };
         }
         return state;
      }

      if (payload === "%") {
         // insert only once at end of last input
         if (!/%\d*\D*(?!.*[\d+\-/*])/.test(state.display)) {
            return { ...state, display: state.display + "%" };
         }
         return state;
      }

      // if input is a digit
      if (/\d/.test(payload)) {
         if (state.display === "0") {
            return { ...state, [type]: payload };
         }
         if (!state.display.endsWith("%")) {
            return { ...state, [type]: state.display + payload };
         }
         return state;
      }

      // if input an operator
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
