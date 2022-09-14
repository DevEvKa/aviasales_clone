import { combineReducers } from 'redux';
import { configureStore } from '@reduxjs/toolkit';
import thunk from 'redux-thunk';

import { ticketsReducer } from './reducers/ticketsReducer';


const rootReducer = combineReducers({
    ticketsReducer: ticketsReducer,
});


export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(thunk),
});
