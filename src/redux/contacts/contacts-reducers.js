import { combineReducers } from 'redux';
import { createReducer } from '@reduxjs/toolkit';
import { fetchContacts, addContact, deleteContact} from './contacts-operations';
import {  changeFilter} from '../contacts/contacts-actions';


const contacts = createReducer([], {
  [fetchContacts.fulfilled]: (_state, {payload}) => payload,
  [addContact.fulfilled]: (state, {payload}) => [...state, payload],
  [deleteContact.fulfilled]: (state, {payload}) => state.filter(({ id }) => id !== payload),
});

const filter = createReducer('', {
  [changeFilter]: (_state, {payload}) => payload,
});

const isLoading = createReducer(false, {
  [fetchContacts.pending]: () => true,
  [fetchContacts.fulfilled]: () => false,
  [fetchContacts.rejected]: () => false,
  [addContact.pending]: () => true,
  [addContact.fulfilled]: () => false,
  [addContact.rejected]: () => false,
  [deleteContact.pending]: () => true,
  [deleteContact.fulfilled]: () => false,
  [deleteContact.rejected]: () => false,
});

const error = createReducer(null, {
  [fetchContacts.rejected]: (_state, { payload }) => payload,
  [fetchContacts.pending]: () => null,
  [addContact.rejected]: (_state, { payload }) => payload,
  [addContact.pending]: () => null,
  [deleteContact.rejected]: (_state, { payload }) => payload,
  [deleteContact.pending]: () => null,
})

export default combineReducers({ contacts, isLoading, error, filter});