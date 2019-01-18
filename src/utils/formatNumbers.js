/**
 *
 * Function which takes a any number. Depending how long is the given
 * number, different process is applied
 *
 * @param {number} number - a number
 *
 * @returns {String}
 */
const toShortNumber = number => {
  number = parseFloat(Number(number)).toFixed(2);
  // Nine Zeroes for Billions
  number =
    Math.abs(Number(number)) >= 1.0e9
      ? Number(Math.abs(Number(number)) / 1.0e9).toFixed(2) + "B"
      : // Six Zeroes for Millions
      Math.abs(Number(number)) >= 1.0e6
      ? Number(Math.abs(Number(number)) / 1.0e6).toFixed(2) + "M"
      : // Three Zeroes for Thousands
      Math.abs(Number(number)) >= 1.0e3
      ? Number(Math.abs(Number(number)) / 1.0e3).toFixed(2) + "K"
      : Math.abs(Number(number));

  //   const lastChar = number.toString().charAt(number.length - 1);

  return number;
};

export { toShortNumber };
