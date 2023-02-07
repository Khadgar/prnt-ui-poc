/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { AxiosResponse } from 'axios';
import { ImageMetadata } from '../contexts/AppContext';

export const arrayRotate = (arr: ImageMetadata[], reverse?: boolean) => {
  if (reverse) arr.unshift(arr.pop()!);
  else arr.push(arr.shift()!);
  return arr;
};

export const getErrorMessageFromResponse = (errorResponse: AxiosResponse) => {
  if (errorResponse.data) {
    if (errorResponse.data.errorMessage) {
      return errorResponse.data.errorMessage;
    }
    if (errorResponse.data.error) {
      return errorResponse.data.error.message;
    }
  }

  return JSON.stringify(errorResponse.data);
};
