import { nanoid, createAsyncThunk } from '@reduxjs/toolkit';
import * as contactsAPI from '../../services/contacts-api';
import {
} from '../contacts/contacts-actions';

export const fetchContacts = createAsyncThunk('contacts/fetchContacts',
    async(_data, {rejectWithValue}) => {
    try {
        return await contactsAPI.fetchContacts();
    } catch (error) {
        return rejectWithValue(error.message);
        }   
    },
);

export const addContact = createAsyncThunk('contacts/addContact',
    async (data, { rejectWithValue }) => {
        try {
            const newContact = {
                id: nanoid(),
                ...data,
            }
            return await contactsAPI.addContact(newContact);
        } catch (error) {
        return rejectWithValue(error.message);
        }   
    },
);
 
export const deleteContact = createAsyncThunk('contacts/deleteContact',
    async ( id, { rejectWithValue }) => {
        try {
           await contactsAPI.deleteContact(id);
            return id;
        } catch (error) {
        return rejectWithValue(error.message);
        }   
    },
);
 
