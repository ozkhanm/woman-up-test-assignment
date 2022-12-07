import { ID_LENGTH } from "./constants";

/**
 * Generates random id
 * @returns random id
 */
export const getRandomId = () => {
  let result = "";
  const chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

  for (let i = 0; i < ID_LENGTH; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }

  return result;  
};
