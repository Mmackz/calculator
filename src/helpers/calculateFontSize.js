function calculateFontSize(input) {
   return input.length > 34
      ? 0.75
      : input.length > 30
      ? 1
      : input.length > 26
      ? 1.15
      : input.length > 23
      ? 1.25
      : input.length > 20
      ? 1.45
      : input.length > 16
      ? 1.75
      : input.length > 14
      ? 2.2
      : input.length > 12
      ? 2.55
      : input.length > 10
      ? 2.85
      : input.length > 8
      ? 3.5
      : 4.15;
}

export default calculateFontSize;
