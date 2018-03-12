import { combineReducers } from 'redux';
import fetchPhotosReducer from './fetch_photos_reducer';

// Combine Reducers
const rootReducer = combineReducers({
  photoList: fetchPhotosReducer
});

export default rootReducer;
