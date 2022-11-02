import { useState } from "react";

const App = () => {
  const anecdotes = [
    "If it hurts, do it more often.",
    "Adding manpower to a late software project makes it later!",
    "The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
    "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
    "Premature optimization is the root of all evil.",
    "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
    "Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.",
  ];
  const [selected, setSelected] = useState(0);
  const [votes, setVotes] = useState({count: Array(anecdotes.length).fill(0), mostVotesKey: 0});

  const setQuote = () => {
    const min = Math.ceil(anecdotes.length);
    const max = Math.floor(0);
    const randomIndex = Math.floor(Math.random() * (max - min) + min);
    setSelected(randomIndex);
  };

  const addVote = () => {
    const copy = [...votes.count];
    copy[selected] += 1;
    const k = copy.reduce((prev, curr, i, arr) => curr > arr[prev] ? i : prev, 0);
    setVotes({count: [...copy], mostVotesKey: k});
  };

  return (
    <div>
      <h1>Anecdote of the day</h1>
      {anecdotes[selected]}
      <br />
      has {votes.count[selected]} votes
      <br />
      <button onClick={setQuote}>next anecdote</button>
      <button onClick={addVote}>vote</button>

      <h1>Anecdote with most votes</h1>
      {anecdotes[votes.mostVotesKey]}
      <br />
      has {votes.count[votes.mostVotesKey]} votes
    </div>
  );
};

export default App;
