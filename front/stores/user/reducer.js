/**
 * Internal dependencies
 */
import {
  USER_SET,
  USER_UNSET
} from '../action-types';

export function user( state = null, action ) {
  switch( action.type ) {
    case USER_SET:
      if ( action.user ) {
        state = action.user;
      }
      break;

    case USER_UNSET:
      state = null;
      break;
  }

  return state;
}
