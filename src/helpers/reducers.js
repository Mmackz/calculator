function reducer(state, action) {
   const { type, payload } = action;

   switch (type) {
      case "equation":
         return { ...state, [type]: payload };
      default:
         return state;
   }
}

export default reducer;
