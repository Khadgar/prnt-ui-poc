import { ImageMetadata } from "../contexts/AppContext";

export const arrayRotate = (arr: ImageMetadata[], reverse?: boolean) => {
  if (reverse) arr.unshift(arr.pop()!);
  else arr.push(arr.shift()!);
  return arr;
};
