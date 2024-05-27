import { combineReducers, configureStore } from '@reduxjs/toolkit';
import themeConfigSlice from './themeConfigSlice';
import adminDetails from './adminDetails'

const rootReducer = combineReducers({
    themeConfig: themeConfigSlice,
    adminDetails : adminDetails
});

export default configureStore({
    reducer: rootReducer
});

export type IRootState = ReturnType<typeof rootReducer>;
