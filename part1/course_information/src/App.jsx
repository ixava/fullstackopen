const App = () => {
  const course = {
    name: "Half Stack application development",
    parts: [
      {
        name: "Fundamentals of React",
        exercises: 10,
      },
      {
        name: "Using props to pass data",
        exercises: 7,
      },
      {
        name: "State of a component",
        exercises: 14,
      },
    ],
  };

  return (
    <div>
      <Header course={course} />
      <Content course={course} />
      <Total course={course} />
    </div>
  );
};

const Header = ({ course: { name } }) => <h1>{name}</h1>;

const Content = ({ course: { parts } }) =>
  parts.map((part, i) => <Part part={part} key={i} />);

const Part = ({ part: { name, exercises } }) => (
  <p>
    {name} {exercises}
  </p>
);

const Total = ({ course: { parts } }) => (
  <p>
    Number of exercises&nbsp;
    {parts.reduce((total, part) => total + part.exercises, 0)}
  </p>
);

export default App;
