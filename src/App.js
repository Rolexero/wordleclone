import './App.css';
import Wordle from './Components/Wordle';
import { useQuery } from 'react-query';



function App() {
  const fetchWordleLetters = async()=>{
    const response = await fetch(
      "http://localhost:8000/Words"
    );
    const data = await response.json();
    return data;
  }

    const { data, status } = useQuery("wordleWords", fetchWordleLetters);
      const randomWords = data && data[Math.floor(Math.random() * data.length)].toLowerCase();

  return (
    <div>
      <Wordle data={randomWords} />
    </div>
  );
}

export default App;
