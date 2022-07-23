import {Action, combineReducers} from 'redux';
import { ThunkAction } from 'redux-thunk';
const rootReducer = combineReducers({
   
});
export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action
  >;
