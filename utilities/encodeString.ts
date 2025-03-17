export function encodeString(
  inputString,
  key = process.env.NEXT_PUBLIC_ENCODED_KEY,
) {
  if (!inputString) {
    console.error('inputString is empty');
  }
  if (!key) {
    console.error('key is empty');
  }
  let encodedArray = [];
  for (let i = 0; i < inputString.length; i++) {
    if (!!inputString && !!key) {
      encodedArray.push(
        inputString?.charCodeAt(i) ^ key?.charCodeAt(i % key?.length),
      );
    }
  }
  // Convert the encoded array to a Base64 string
  return btoa(String.fromCharCode(...encodedArray));
}

export function decodeString(
  encodedString,
  key = process.env.NEXT_PUBLIC_ENCODED_KEY,
) {
  let decodedArray = [];
  let decodedString = atob(encodedString); // Decode from Base64
  for (let i = 0; i < decodedString.length; i++) {
    decodedArray.push(
      decodedString?.charCodeAt(i) ^ key?.charCodeAt(i % key?.length),
    );
  }
  return String.fromCharCode(...decodedArray);
}
