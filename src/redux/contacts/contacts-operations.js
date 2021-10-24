import {nanoid  } from '@reduxjs/toolkit';
import * as contactsAPI from '../../services/contacts-api';
import {
  fetchContactsSuccess,
  fetchContactsRequest,
  fetchContactsError,
  addContactRequest,
  addContactSuccess,
  addContactError,
  deleteContactRequest,
  deleteContactSuccess,
  deleteContactError,
} from '../contacts/contacts-actions';

export const fetchContacts = () => async dispatch => {
    dispatch(fetchContactsRequest());

    try {
        const contacts = await contactsAPI.fetchContacts();
        dispatch(fetchContactsSuccess(contacts));
    } catch (error) {
        dispatch(fetchContactsError(error));
    }   
};

export const addContact = data => async dispatch => {
    const newContact = {
        id: nanoid(),
        ...data,
    }

    dispatch(addContactRequest());

    try {
        const contact = await contactsAPI.addContact(newContact);
        dispatch(addContactSuccess(contact));
    } catch (error) {
        dispatch(addContactError(error));
    } 
};


export const deleteContact = id => async dispatch => {
    dispatch(deleteContactRequest());

    try {
        await contactsAPI.deleteContact(id);
        dispatch(deleteContactSuccess(id));
    } catch (error) {
        dispatch(deleteContactError(error));
    }   
};