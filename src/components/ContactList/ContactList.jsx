import PropTypes from 'prop-types';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import useDebounce from '../../Hooks/debounce-hook';
import {
  deleteContact,
  fetchContacts,
} from '../../redux/contacts/contacts-operations';
import { getFilteredContacts } from '../../redux/contacts/contacts-selectors';

import { List, Item, Button } from './ContactList.styled';

export const ContactList = () => {
  const FilteredContacts = useSelector(getFilteredContacts);

  const dispatch = useDispatch();
  const onDeleteContact = id => dispatch(deleteContact(id));

  const debouncedFilteredContacts = useDebounce(FilteredContacts, 500);

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  return (
    <List>
      {debouncedFilteredContacts.map(({ id, name, number }) => (
        <Item key={id}>
          <span>{name}:</span> <span>{number}</span>
          <Button type="button" onClick={() => onDeleteContact(id)}>
            Delete
          </Button>
        </Item>
      ))}
    </List>
  );
};

ContactList.propTypes = {
  contacts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      name: PropTypes.string,
      number: PropTypes.string,
    }),
  ),
  onDeleteContacts: PropTypes.func,
};
