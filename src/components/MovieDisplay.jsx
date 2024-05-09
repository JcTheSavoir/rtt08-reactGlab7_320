const MovieDisplay = (props) => {
  const loaded = () => {
    return (
    <>
      <h1>{props.movie.Title}</h1>
      <h2>{props.movie.Genre}</h2>
      <img src={props.movie.Poster} alt={props.movie.Title} />
      <h2>{props.movie.Year}</h2>
    </>
    )
  }
  const loading = () => {
    return <h1>No Movie to Display</h1>;
  };

  // Ternary operator will determine which functions JSX we will return
  return props.movie ? loaded() : loading();
}
export default MovieDisplay