// import viteLogo from '/vite.svg'
// import './App.css'
import { useState/*, useEffect*/ } from 'react'



//--- ------------------------------------------------
//--- ------------------------------------------------
const AnecdoteView = (props) => {

  return (
    <>
      <div>{ props.anecdote }</div>
      <div>Has { props.vote } vote{ (props.vote > 1) ? 's': '' }</div>
    </>
  )

}

//--- ------------------------------------------------
//--- ------------------------------------------------
const AnecdoteTopVotes = (props) => {

  return (
  <div>
    <h2>Anecdote with most votes</h2>
    {
      (props.anecdoteTopVotes_votes < 1) ?
        (<div>No votes given yet</div>)
      :
        (<AnecdoteView anecdote = { props.anecdoteTopVotes } vote = { props.anecdoteTopVotes_votes }></AnecdoteView>)
    }
  </div>
  )

}

//--- ------------------------------------------------
//--- ------------------------------------------------
const App = () => {

  
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when dianosing patients.',
    'The only way to go fast, is to go well.'
  ]
  // console.log('anecdotes.lenght (default): ', anecdotes.length);

  //--- Set random number ----------------
  const num_setRandom = () => { // (!) Before using useEffect (!)
    return Math.floor(Math.random() * anecdotes.length)
    // console.log('works');
  }

  const [ votes, setVotes ] = useState( Array(anecdotes.length).fill(0) )
  const [ selected, setSelected ] = useState( num_setRandom() )
  const [ votesTop, setVotesTop ] = useState( 0 )
  // console.log('selected (default): ', selected);


  //--- METHODs ---------------------------------------
  
  //--- Set random anecdote ----------------
  const anecdote_setRandom = () => {
    setSelected(num_setRandom())
    // console.log('selected: ', selected);
  }

  //--- Vote for current anecdote ----------
  const anecdote_vote = () => {
    let this_votes = [...votes]
    this_votes[selected]++
    setVotes(this_votes)
    console.log('anecdote_vote => votes: ', votes);
    // console.log('anecdote_vote => Selected: ', selected);
    console.log('anecdote_vote => Vote current: ', votes[selected]);
    votesTop_set(this_votes)
  }

  //--- VotesTop: set index of the anecdote with most votes --------
  const votesTop_set = (this_votes) => {
    setVotesTop(
      this_votes.reduce(
        (indexMax, vote, indexCurrent, arr) => (vote > arr[indexMax]) ? indexCurrent : indexMax, 0
      )
    )
    // console.log('votesTop: ', votesTop);
  }
  

  //----------------------------------------
  return (
    <>
      <h2>Anecdote of the day</h2>
      <button onClick = { anecdote_vote }>Vote</button>
      <button onClick = { anecdote_setRandom }>Next anecdote</button>
      <AnecdoteView anecdote = { anecdotes[selected] } vote = { votes[selected] }></AnecdoteView>
      <AnecdoteTopVotes anecdoteTopVotes = { anecdotes[votesTop] } anecdoteTopVotes_votes = { votes[votesTop] }></AnecdoteTopVotes>
    </>
  )
}

export default App
