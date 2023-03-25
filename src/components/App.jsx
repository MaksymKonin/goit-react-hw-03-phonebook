import { Component } from 'react';
import { nanoid } from 'nanoid';
import FormCreateNewContact from './formCreateNewContact';
import ListContacts from './listContacts';
import Filter from './filter';

class App extends Component {
  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
  };

  formSubmithandle = data => {
    this.setState(prev => {
      return this.createContact(data)
        ? {
            contacts: [...prev.contacts, this.createContact(data)],
          }
        : { contacts: prev.contacts };
    });
  };

  createContact = ({ name, number }) => {
    const { contacts } = this.state;
    if (contacts.find(contact => contact.name === name)) {
      return alert(`${name} is already in contacts`);
    } else {
      return { id: nanoid(), name, number };
    }
  };

  handleChangeFilter = e => {
    return this.setState({ filter: e.target.value });
  };

  filterContacts = () => {
    const { contacts, filter } = this.state;
    return contacts.filter(contact => {
      let normalizedName = contact.name.toUpperCase();
      return normalizedName.includes(filter.toUpperCase());
    });
  };

  deleteContact = id => {
    this.setState(prev => ({
      contacts: prev.contacts.filter(contact => contact.id !== id),
    }));
  };

  render() {
    const { contacts, filter } = this.state;
    return (
      <div>
        <h1>Phonebook</h1>
        <FormCreateNewContact onSubmit={this.formSubmithandle} />
        <h2>Contacts</h2>
        <Filter filter={filter} onChangeFilter={this.handleChangeFilter} />
        {filter === '' ? (
          <ListContacts
            contacts={contacts}
            onDeleteContact={this.deleteContact}
          />
        ) : (
          <ListContacts
            contacts={this.filterContacts()}
            onDeleteContact={this.deleteContact}
          />
        )}
      </div>
    );
  }
}
export default App;
