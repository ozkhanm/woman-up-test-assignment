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

/**
 * Generates File Object from url
 * @param {String} url image url
 * @returns {File} file object
 */
export const urlToObject = async url => {
  const fileName = urlToFilename(url);
  const response = await fetch(url);
  const blob = await response.blob();
  const file = new File([blob], fileName, {type: blob.type});

  return file;
};

/**
 * Gets file name from url
 * @param {String} url 
 * @returns {String}
 */
export const urlToFilename = url => {
  const urlSplit = url.split("/");
  const fileName = urlSplit[urlSplit.length - 1].split("?")[0];

  return fileName;
};
