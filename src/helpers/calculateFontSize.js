function calculateFontSize(input) {
   const filteredInput = input.replace(/ |,/g, "");
   const diff = input.length - filteredInput.length;
   const inputLength = filteredInput.length + diff / 2.99;

   return inputLength > 40
      ? 0.85
      : inputLength > 36
      ? 0.9
      : inputLength > 32
      ? 1
      : inputLength > 30
      ? 1.15
      : inputLength > 28
      ? 1.25
      : inputLength > 26
      ? 1.3
      : inputLength > 24
      ? 1.45
      : inputLength > 22
      ? 1.55
      : inputLength > 19
      ? 1.7
      : inputLength > 18
      ? 1.925
      : inputLength > 17
      ? 2
      : inputLength > 15
      ? 2.2
      : inputLength > 13
      ? 2.5
      : inputLength > 11
      ? 2.8
      : inputLength > 8
      ? 3.4
      : 4.15;
}

export default calculateFontSize;
