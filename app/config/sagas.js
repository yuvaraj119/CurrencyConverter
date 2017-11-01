import {takeEvery, select, call} from 'redux-saga/effects';

// 1. Swap currency
// 2. change base currency
// 3. upon initial app load

import {SWAP_CURRENCY, CHANGE_BASE_CURRENCY, GET_INITIAL_CONVERSION} from '../actions/currencies';

const getLatestRate = currency => fetch(`http://api.fixer.io/latest?base=${currency}`);

function* fetchLatestConversionRates(action) {
    let currency = action.currency;
    if(currency === undefined){
        currency = yield select(state => state.currenciesR.baseCurrency);
    }
    const response = yield call(getLatestRate,currency);
    console.log('currency',currency);
}

export default function* rootSaga() {
    yield takeEvery(GET_INITIAL_CONVERSION,fetchLatestConversionRates);
    yield takeEvery(SWAP_CURRENCY,fetchLatestConversionRates);
    yield takeEvery(CHANGE_BASE_CURRENCY,fetchLatestConversionRates);
}