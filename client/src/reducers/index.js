import { combineReducers } from 'redux';
import fetchPhotosReducer from './fetch_photos_reducer';

const rootReducer = combineReducers({
  photoList: fetchPhotosReducer
});

export default rootReducer;
