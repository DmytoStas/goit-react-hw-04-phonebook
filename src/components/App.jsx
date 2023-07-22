import { nanoid } from 'nanoid';

import { useEffect, useState } from 'react';

import Section from './Section';
import ContactsList from './ContactsList';
import Filter from './Filter';
import PhonebookForm from './PhonebookForm';

const LS_KEY = 'contacts';

function App() {
  const [contacts, setContacts] = useState(() => {
    return JSON.parse(window.localStorage.getItem(LS_KEY)) ?? [];
  });
  const [filter, setFilter] = useState('');

  useEffect(() => {
    window.localStorage.setItem(LS_KEY, JSON.stringify(contacts));
  }, [contacts]);

  const handleSubmit = ({ name, number }) => {
    const hasContact = contacts.some(contact => {
      const normalizedName = contact.name.toLowerCase();
      return normalizedName.includes(name.toLowerCase());
    });

    if (!hasContact) {
      const newContact = {
        id: nanoid(),
        name,
        number,
      };

      setContacts(prevContacts => [...prevContacts, newContact]);
    } else {
      alert(`${name} is already in contacts.`);
    }
  };

  const visibleContacts = () => {
    const normalizedFilter = filter.toLowerCase();

    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );
  };

  const deleteContact = evt => {
    setContacts(prevContacts =>
      prevContacts.filter(contact => evt.target.id !== contact.id)
    );
  };

  return (
    <>
      <Section title={'Phonebook'}>
        <PhonebookForm onSubmit={handleSubmit} />
        <h2>Contacts</h2>
        <Filter
          filter={filter}
          onChange={e => {
            setFilter(e.target.value);
          }}
        />
        <ContactsList contacts={visibleContacts()} onClick={deleteContact} />
      </Section>
    </>
  );
}

export default App;
