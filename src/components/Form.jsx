import {useState, useEffect} from 'react'

const Form = (props) => {
  //State to hold the data for the form
  const [formData, setFormData] = useState({
    searchTerm: "",
  });

  //handleChange - updates formData you type into form
  const handleChange = (event) => {
    //Use the event object to detect key, and value to update
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleSubmit = (event) => {
    // Prevent page from refreshing on form submission
    event.preventDefault();
    // Pass the search term to movieSearch prop, which is from the App.jsx getMovie function
    props.movieSearch(formData.searchTerm)
  }

  return (
    <div className='formContainer'>
      <h1 className='formTitle'>Enter Search Term Below</h1>
        <form className='formItself' onSubmit={handleSubmit}>
            <input className='formSearch' type="text" name="searchTerm" onChange={handleChange} value={formData.searchTerm} />
            <button className='formButton' type="submit" value="submit">Submit</button>
        </form>
    </div>
  )
}
export default Form