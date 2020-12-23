import {
  SET_CONTACTS,
  SET_US_CONTACTS,
} from './action_types';

const setContacts = (contacts, page, total) => {
  return {
    type: SET_CONTACTS,
    payload: [contacts, page, total],
  };
};

const setUSContacts = (contacts, page, total) => {
  return {
    type: SET_US_CONTACTS,
    payload: [contacts, page, total],
  };
};

export default { setContacts, setUSContacts };