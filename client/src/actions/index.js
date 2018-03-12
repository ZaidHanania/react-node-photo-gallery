import axios from 'axios';

export const FETCH_PHOTOS = 'FETCH_PHOTOS';

export function fetchPhotos(sharks, cats) {
  var filter;

  // Decide what images to fetch
  if (sharks && cats || !sharks & !cats) {
    filter = 'all';
  } else if (sharks) {
    filter = 'sharks';
  } else {
    filter = 'cats';
  }

  // Construct request URL and use axios to return promise
  const request = axios.get(`/api/${filter}`);

  // Use thunk to dispatch action when promise resolves
  return function (dispatch) {
    return request.then(
      result => dispatch({
        type: FETCH_PHOTOS,
        payload: result.data // Payload contains array of image urls
      }));
  };
}