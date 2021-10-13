import { combineReducers } from 'redux';
import { TypedUseSelectorHook, useSelector } from "react-redux";
import user from './user'

export const rootReducer =  combineReducers({
    user
});
export type RootState = ReturnType<typeof rootReducer>;
export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;