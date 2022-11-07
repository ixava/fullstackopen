const Persons = ({ persons, search, delPerson }) => {
  let renderPersons;
  if (search !== "")
    renderPersons = persons.filter((person) =>
      person.name.toLowerCase().includes(search.toLowerCase())
    );
  else renderPersons = persons;

  return renderPersons.map((person) => (
    <Person key={person.name} person={person} delPerson={delPerson} />
  ));
};

const Person = ({ person, delPerson }) => {
  const { name, number } = person;
  return (
    <span>
      {name} {number} <button onClick={() => delPerson(person)}>delete</button>
      <br />
    </span>
  );
};

export default Persons;
