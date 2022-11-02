import { useState } from "react";

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const handleClick = (stateUpdateFn, stateValue) => () =>
    stateUpdateFn(stateValue + 1);

  return (
    <div>
      <div>
        <Header text="Give Feedback" />
        <Button text="good" onClick={handleClick(setGood, good)} />
        <Button text="neutral" onClick={handleClick(setNeutral, neutral)} />
        <Button text="bad" onClick={handleClick(setBad, bad)} />
      </div>
      <Statistics {...{ good, neutral, bad, all: good + neutral + bad }} />
    </div>
  );
};

const Statistics = ({ good, neutral, bad, all }) => {
  if (!all) return <></>;
  return (
    <div>
      <Header text="Statistics" />
      <table>
        <tbody>
          <StatisticsLine text="good" value={good} />
          <StatisticsLine text="neutral" value={neutral} />
          <StatisticsLine text="bad" value={bad} />
          <StatisticsLine text="all" value={all} />
          <StatisticsLine
            text="average"
            value={!good && !bad ? 0 : (good * 1 + bad * -1) / all}
          />
          <StatisticsLine
            text="positive"
            value={`${!good ? 0 : (good / all) * 100} %`}
          />
        </tbody>
      </table>
    </div>
  );
};

const StatisticsLine = ({ text, value }) => {
  return (
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
  );
};

const Button = ({ text, onClick }) => <button onClick={onClick}>{text}</button>;

const Header = ({ text }) => <h1>{text}</h1>;

export default App;
