import { evaluate, format } from "mathjs";

const options = {
   precision: 12,
   upperExp: 12
};

function reducer(state, action) {
   const { payload } = action;

   function evaluateExpression() {
      const display = /[+\-*/]$/.test(state.display)
         ? state.display.slice(0, -1)
         : state.display;
      const ans = format(
         evaluate(state.evaluatedLastInput ? state.subdisplay : display),
         options
      );
      return ans;
   }

   if (payload === "=" || payload === "Enter") {
      const ans = evaluateExpression();
      return {
         ...state,
         display: ans,
         subdisplay: state.evaluatedLastInput
            ? state.subdisplay
            : /[+\-*/]$/.test(state.display)
            ? state.display.slice(0, -1)
            : state.display,
         evaluatedLastInput: true
      };
   }

   if (payload === "C") {
      return { display: "0", subdisplay: "", evaluatedLastInput: false };
   }

   if (payload === "+/-") {
      // if equation ends with an operator or is infinity
      if (/[+\-*/]$/.test(state.display) || state.display === "Infinity") {
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
            state.display.slice(
               0,
               lastNumberMatch.index ? lastNumberMatch.index : 0
            ) + flippedNum
      };
   }

   if (payload === ".") {
      if (state.evaluatedLastInput) {
         return {
            ...state,
            display: payload,
            subdisplay: "",
            evaluatedLastInput: false
         };
      }
      // if last input does not contain a decimal point
      if (
         !/\.\d*(?!.*[\d+\-/*])/.test(state.display) &&
         !state.display.endsWith("%")
      ) {
         return { ...state, display: state.display + "." };
      }
      return state;
   }

   if (payload === "%") {
      // insert only once at end of last input if it is not an operator
      if (
         !/%\d*\D*(?!.*[\d+\-/*])/.test(state.display) &&
         !/[+\-*/]$/.test(state.display)
      ) {
         return { ...state, display: state.display + "%" };
      }
      return state;
   }

   // if input is a digit
   if (/\d/.test(payload)) {
      if (state.evaluatedLastInput) {
         return {
            ...state,
            display: payload,
            subdisplay: "",
            evaluatedLastInput: false
         };
      }
      if (state.display === "0") {
         return { ...state, display: payload };
      }
      if (!state.display.endsWith("%")) {
         return { ...state, display: state.display + payload };
      }
      return state;
   }

   // if input an operator
   if (/[+\-*/]/.test(payload)) {
      // if equation ends with an operator
      if (/[+\-*/]$/.test(state.display)) {
         return { ...state, display: state.display.slice(0, -1) + payload };
      }
      return {
         ...state,
         display: state.display + payload,
         evaluatedLastInput: false
      };
   }

   return state;
}

export default reducer;
