import { nanoid } from 'nanoid';

import { Component } from 'react';

import Section from './Section';
import ContactsList from './ContactsList';
import Filter from './Filter';
import PhonebookForm from './PhonebookForm/PhonebookForm';

const LS_KEY = 'contacts';

export default class App extends Component {
  state = {
    contacts: [],
    filter: '',
  };

  componentDidMount() {
    const contacts = localStorage.getItem(LS_KEY);
    const parseContacts = JSON.parse(contacts);

    if (parseContacts) {
      this.setState({ contacts: parseContacts });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const newContacts = this.state.contacts;
    const prevContacts = prevState.contacts;

    if (newContacts !== prevContacts) {
      localStorage.setItem(LS_KEY, JSON.stringify(newContacts));
    }
  }

  handleSubmit = values => {
    const { name, number } = values;
    const { contacts } = this.state;

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

      this.setState(prevState => ({
        contacts: [...prevState.contacts, newContact],
      }));
    } else {
      alert(`${name} is already in contacts.`);
    }
  };

  changeFilter = evt => {
    this.setState({ filter: evt.target.value });
  };

  getFilteredContacts = () => {
    const { filter, contacts } = this.state;
    const normalizetFilter = filter.toLowerCase();

    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizetFilter)
    );
  };

  deleteContact = evt => {
    this.setState(prevState => {
      const contactsAfterDelete = prevState.contacts.filter(
        contact => evt.target.id !== contact.id
      );
      return { contacts: contactsAfterDelete };
    });
  };

  render() {
    const { filter } = this.state;
    const visibleContacts = this.getFilteredContacts();
    return (
      <>
        <Section title={'Phonebook'}>
          <PhonebookForm onSubmit={this.handleSubmit} />
          <h2>Contacts</h2>
          <Filter filter={filter} onChange={this.changeFilter} />
          <ContactsList
            contacts={visibleContacts}
            onClick={this.deleteContact}
          />
        </Section>
      </>
    );
  }
}
