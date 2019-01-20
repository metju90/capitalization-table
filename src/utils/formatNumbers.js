/**
 *
 * Function which takes a any number. Depending how long is the given
 * number, different process is applied
 *
 * @param {number} number - a number
 *
 * @returns {String} Short number with dollar sign
 */
const shortNumber = number => {
  number = parseFloat(Number(number)).toFixed(2);
  number =
    Math.abs(Number(number)) >= 1.0e9
      ? // Nine Zeroes for Billions
        Number(Math.abs(Number(number)) / 1.0e9).toFixed(2) + "B"
      : // Six Zeroes for Millions
      Math.abs(Number(number)) >= 1.0e6
      ? Number(Math.abs(Number(number)) / 1.0e6).toFixed(2) + "M"
      : // Three Zeroes for Thousands
      Math.abs(Number(number)) >= 1.0e3
      ? Number(Math.abs(Number(number)) / 1.0e3).toFixed(2) + "K"
      : Math.abs(Number(number));
  return `${number}`;
};

export { shortNumber };
