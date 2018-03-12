import axios from 'axios';

export const FETCH_PHOTOS = 'FETCH_PHOTOS';

export function fetchPhotos(sharks, cats) {
  
  var filter;
  if (sharks && cats || !sharks & !cats) {
    filter = 'all'
  } else if (sharks) {
    filter = 'sharks';
  } else {
    filter = 'cats';
  }

  const request = axios.get(`/api/${filter}`);

  return function (dispatch) {
    return request.then(
      result => dispatch({
        type: FETCH_PHOTOS,
        payload: result.data
      }));
  };
}