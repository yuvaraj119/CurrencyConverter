import { combineReducers } from 'redux';

import currenciesR from './currenciesR';
import themeR from './themeR';
import nav from './nav';

export default combineReducers({
  currenciesR,
  themeR,
  nav,
});
