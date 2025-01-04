/**
 * Capitalizes the first letter of each word in a string.
 * @param str - The input string.
 * @returns The capitalized string.
 */
export const toCapitalCase = (str: string): string => {
  return str.replace(/\b\w/g, (char) => char.toUpperCase());
};
