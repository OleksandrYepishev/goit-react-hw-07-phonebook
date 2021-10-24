import { configureStore} from '@reduxjs/toolkit';
import phohebookReducer from '../redux/contacts/contacts-reducers';

export const store = configureStore({
  reducer: {
    phonebook:  phohebookReducer,
  },
    devTools: process.env.NODE_ENV === 'development',
  });
