import _ from 'lodash';

import { FETCH_PHOTOS } from '../actions';

export default function(initalState = [], action) {

  switch(action.type) {
    case FETCH_PHOTOS:
      return _.shuffle(action.payload); // Shuffles pictures and returns them
    default:
      return initalState;
  }
}