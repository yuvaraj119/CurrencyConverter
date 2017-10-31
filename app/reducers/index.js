import {combineReducers} from 'redux';

import currenciesR from './currenciesR';
import themeR from './themeR';

export default combineReducers({
    currenciesR, themeR
});
