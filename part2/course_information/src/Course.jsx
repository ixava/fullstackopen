const Header = ({ course }) => <h2>{course}</h2>;

const Total = ({ parts }) => (
  <h4>
    Number of exercises &nbsp;
    {parts.reduce((prev, curr) => prev + curr.exercises, 0)}
  </h4>
);

const Part = ({ part }) => (
  <p>
    {part.name} {part.exercises}
  </p>
);

const Content = ({ parts }) => (
  <>
    {parts.map(part => (
      <Part part={part} key={part.id} />
    ))}
  </>
);

const Course = ({ course }) => {
  return (
    <div>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  );
};

export default Course;
