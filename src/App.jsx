import { useState, useEffect } from 'react'
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

  const getRandomMovie = async() => {
    try{
      // Create empty array to add numbers too
      let setOfNums = []
      // for loop to add 8 numbers to the array
      for (let i = 0; i < 6; i++) {
        let randomNumbers = getRandomNumberIMDB(0, 9)
        const addNums = setOfNums.push(randomNumbers)
      }

      // Concatenate the array of numbers into a single number
      const imdbID = setOfNums.join("");
      console.log(`${imdbID} is the imdbID`)
      console.log(typeof(imdbID))
      const response = await fetch(
        `http://www.omdbapi.com/?apikey=${apikey}&i=tt00${imdbID}`
      );
      const data = await response.json();
      console.log(data)
      console.log(`above is the data returned`)
      // Check if API returned an object with the Response: "False" key value pair
      // and the imdbID is over 6 digits; if so break the loop by setting movie to default
      if ((data.Error === "Error getting data."|| data.Error === "Incorrect IMDb ID.") && imdbID >= 1000000) {
        getMovie("The Matrix")
      } else if (data.Error === "Error getting data." || data.Error === "Incorrect IMDb ID."){
        //If only data.Response is equal to "False", rerun getRandomMovie() 
        console.log(`elseif triggered`)
        await getRandomMovie()
      } else {
        //If Neither are true, then setMovie to the response
        setMovie(data)
      }
    } catch(e) {
      console.error(e)
    };
  };

  const getRandomNumberIMDB = (min, max) => {
    const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
    return randomNumber
  }

  useEffect(() => {
      getRandomMovie()
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
