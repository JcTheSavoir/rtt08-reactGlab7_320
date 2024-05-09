import { useState, useEffect } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import './App.css'

import Form from './components/Form'
import MovieDisplay from './components/MovieDisplay'

function App() {
  // Constant with API Key
  const apikey = import.meta.env.VITE_KEYAPI
  //state for holding movie data
  const [movie, setMovie] = useState(null)
  //function to get movies
  const getMovie = async(search) => {
    try{
    // Fetch request and store the response
      const response = await fetch(
        `http://www.omdbapi.com/?apikey=${apikey}&t=${search}`
      );
      //Data from api will be in JSON, parse into a JS object
      const data = await response.json();
      // Set the Movie state to the received data
      setMovie(data)
    } catch(e) {
      console.error(e)
    };
  };

  useEffect(() => {
    getMovie("Clueless");
  }, []);

  // Pass the getMovie function as a prop called movieSearch
  return (
    <div className="App">
      <Form movieSearch={getMovie}/>
      <MovieDisplay movie={movie}/>

    </div>

  

  )
}

export default App
