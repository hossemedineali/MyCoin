
import { configureStore } from '@reduxjs/toolkit';

import authReducer from './auth';
import currencyReducer from './currency';

const store = configureStore({
    reducer :{auth:authReducer}
});

export default store;