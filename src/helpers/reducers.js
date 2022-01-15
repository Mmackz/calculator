import { evaluate, format } from "mathjs";

const options = {
   precision: 12,
   upperExp: 12,
   lowerExp: -20
};

function reducer(state, action) {
   const { payload } = action;
   const lastInput = state.subdisplay.match(/\b[+\-*/]-?[\d.%]{0,}(?!.*\d)/);

   function evaluateExpression() {
      const display = /[+\-*/]$/.test(state.display)
         ? state.display.slice(0, -1)
         : state.display;

      const ans = format(
         evaluate(
            state.evaluatedLastInput && lastInput
               ? display + lastInput
               : display
         ),
         options
      );
      return ans;
   }

   function animateDisplay() {
      const mainDisplay = document.getElementById("display");
      const subDisplay = document.getElementById("sub-display");
      const innerScreen = document.querySelector(".screen-inner");
      mainDisplay.classList.add("animate-main-display");
      subDisplay.classList.add("animate-sub-display");
      innerScreen.classList.add("animate-lineheight");
      setTimeout(() => {
         mainDisplay.classList.remove("animate-main-display");
         subDisplay.classList.remove("animate-sub-display");
         innerScreen.classList.remove("animate-lineheight");
      }, 250);
   }

   if (payload === "=" || payload === "Enter") {
      const ans = evaluateExpression();
      animateDisplay();
      return {
         display: ans,
         subdisplay:
            state.evaluatedLastInput && lastInput
               ? state.display + lastInput
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
      // if equation ends with an operator
      if (/[+\-*/]$/.test(state.display)) {
         return state;
      }
      // if equation is in exponential notation (eg. 10e+12)
      if (/-?\d+e[+-]\d+$/.test(state.display)) {
         const expDisplay = state.display.startsWith("-")
            ? state.display.slice(1)
            : `-${state.display}`;
         return { ...state, display: expDisplay };
      }

      if (state.display === "Infinity") {
         return { ...state, display: "-Infinity" };
      }
      if (state.display === "-Infinity") {
         return { ...state, display: "Infinity" };
      }
      const lastNumberMatch = state.display.match(
         /-?[\d.%]{1,}(?!.*\d)|-?\d+\.\d+e.\d+%?(?!.*\d)/
      );

      let isPrecededByDigit = false;

      if (
         lastNumberMatch[0].startsWith("-") &&
         /\d/.test(state.display[lastNumberMatch.index - 1])
      ) {
         isPrecededByDigit = true;
      }

      // if subtract symbol is preceded by digit
      const lastNumber = isPrecededByDigit
         ? -parseFloat(lastNumberMatch[0].slice(1))
         : -parseFloat(lastNumberMatch[0]);

      const index = isPrecededByDigit
         ? lastNumberMatch.index + 1
         : lastNumberMatch.index
         ? lastNumberMatch.index
         : 0;

      const flippedNum = lastNumberMatch[0].endsWith("%")
         ? lastNumber + "%"
         : lastNumber;

      return {
         ...state,
         display: state.display.slice(0, index) + flippedNum
      };
   }

   if (payload === ".") {
      if (state.evaluatedLastInput) {
         return {
            display: `0.`,
            subdisplay: "",
            evaluatedLastInput: false
         };
      }
      // if equation ends with an operator
      if (/[+\-*/]$/.test(state.display)) {
         return { ...state, display: state.display + "0." };
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
         return {
            ...state,
            display: state.display + "%",
            evaluatedLastInput: false
         };
      }
      return state;
   }

   // if input is a digit
   if (/\d/.test(payload)) {
      if (state.evaluatedLastInput) {
         return {
            display: payload,
            subdisplay: "",
            evaluatedLastInput: false
         };
      }

      // replace single zeroes with input
      if (state.display.match(/[\d.%]{1,}(?!.*\d)/)[0] === "0") {
         return {
            ...state,
            display: state.display.slice(0, -1) + payload
         };
      }

      if (!state.display.endsWith("%")) {
         return { ...state, display: state.display + payload };
      }
      return state;
   }

   // if input an operator
   if (/[+\-*/]/.test(payload)) {
      // if equation ends with 2 operators
      if (/[+\-*/]{2}$/.test(state.display)) {
         return { ...state, display: state.display.slice(0, -2) + payload };
      }
      // if equation ends with an operator
      if (/[+\-*/]$/.test(state.display)) {
         if (payload === "*" || payload === "/" || payload === "+") {
            return { ...state, display: state.display.slice(0, -1) + payload };
         }
         return { ...state, display: state.display + payload };
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
