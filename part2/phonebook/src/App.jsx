import { useState, useEffect } from "react";

import services from "./services";

import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import Notification from "./components/Notification";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [search, setSearch] = useState("");
  const [message, setMessage] = useState("");
  const [messageIsError, setmessageIsError] = useState(false);

  const handleNameChange = (event) => setNewName(event.target.value);
  const handleNumberChange = (event) => setNewNumber(event.target.value);
  const handleSearchChange = (event) => setSearch(event.target.value);

  const setNotification = (message, isError) => {
    setMessage(message);
    setmessageIsError(isError);
    setTimeout(() => setMessage(null), 3000);
  };

  useEffect(() => {
    services
      .getAll()
      .then((initPersons) => {
        setNotification("Fetched phonebook entries successfully", false);
        setPersons(initPersons.data);
      })
      .catch((error) => setNotification("Failed to load phonebook", true));
  }, []);

  const addPerson = (event) => {
    event.preventDefault();
    const userCancelled = () =>
      !window.confirm(
        `${newName} is already added to the phonebook, replace the old number with a new one?`
      );
    const personExists = persons.find(
      (person) => person.name.toLowerCase() === newName.toLowerCase()
    );

    if (personExists === undefined)
      services
        .create({ name: newName, number: newNumber })
        .then((res) => {
          setPersons([...persons, { ...res.data }]);
          setNotification(
            `Successfully added ${newName} to the phonebook!`,
            false
          );
        })
        .catch((error) => setNotification("Failed to add person", true));

    if (personExists !== undefined) {
      if (userCancelled()) return;
      services
        .update(personExists.id, {
          name: personExists.name,
          number: newNumber,
        })
        .then((res) => {
          const oldRemoved = persons.filter(
            (person) => person.id !== personExists.id
          );
          setPersons([...oldRemoved, res.data]);
          setNotification(
            `Successfully updated ${personExists.name}'s number in the phonebook`,
            false
          );
        })
        .catch((error) => setNotification("Failed to update user", true));
    }

    setNewName("");
    setNewNumber("");
  };

  const delPerson = (delPerson) => {
    if (!window.confirm(`Delete ${delPerson.name} ?`)) return;
    else
      services
        .del(delPerson.id)
        .then((res) => {
          setPersons(persons.filter((person) => person.id !== delPerson.id));
          setNotification(
            `Successfully removed ${delPerson.name} from the phonebook`,
            false
          );
        })
        .catch((error) =>
          setNotification(
            `Information of ${delPerson.name} has already been deleted from the server`,
            true
          )
        );
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message} isError={messageIsError} />
      <Filter {...{ handleSearchChange, search }} />
      <h2>Add a new</h2>
      <PersonForm
        {...{
          handleNumberChange,
          handleNameChange,
          newNumber,
          newName,
          addPerson,
        }}
      />
      <h2>Numbers</h2>
      <Persons persons={persons} search={search} delPerson={delPerson} />
    </div>
  );
};

export default App;
