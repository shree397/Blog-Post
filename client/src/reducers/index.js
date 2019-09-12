import { combineReducers } from 'redux';
import alert from './alert';
import auth from './auth';
import blogs from './blogs';

export default combineReducers({
  alert,
  auth,
  blogs
});
