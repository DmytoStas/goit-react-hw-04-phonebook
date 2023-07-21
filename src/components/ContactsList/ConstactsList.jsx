import PropTypes from 'prop-types';

import { ContactsListUl, ListItemWrapp } from './ContactsList.styled';

function ContactsList({ contacts, onClick }) {
  return (
    <ContactsListUl>
      {contacts.map(contact => (
        <li key={contact.id}>
          <ListItemWrapp>
            <p>
              {contact.name}: <span>{contact.number}</span>
            </p>
            <button type="button" id={contact.id} onClick={onClick}>
              Delete
            </button>
          </ListItemWrapp>
        </li>
      ))}
    </ContactsListUl>
  );
}

ContactsList.propTypes = {
  contacts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      number: PropTypes.string.isRequired,
    })
  ).isRequired,
  onClick: PropTypes.func.isRequired,
};

export default ContactsList;
