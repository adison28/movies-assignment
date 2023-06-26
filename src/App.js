import SplitPane, {
  Divider,
  SplitPaneLeft,
  SplitPaneRight,
  SplitPaneTop
} from "./SplitPane";
import { useState, useEffect } from "react";
import InputAdornment from '@mui/material/InputAdornment';
import TextField from '@mui/material/TextField';
import SearchIcon from '@mui/icons-material/Search';
import "./App.css";

const App = () => {
  const [movieData, setMovieData] = useState({})
  const [currMovie, setCurrMovie] = useState(0);

  const findMovie = (value) => {
    for (let i = 0; i < movieData.length; i++) {
      if (movieData[i].title.toUpperCase().includes(value.toUpperCase())) {
        setCurrMovie(movieData[i].episode_id);
      }
    }
  }

  const applySort = (value) => {
    let temp = []
    const types = {
      Episode: 'episode_id',
      Year: 'release_date'
    };
    let sortType = types[value]
    if(sortType == 'episode_id') {
      temp = movieData.sort((a, b) => a[sortType] - b[sortType]).slice()
    }
    else {
      temp = movieData.sort((a, b) => {
        let date1 = new Date(a[sortType])
        let date2 = new Date(b[sortType])
        return date1 - date2
      }).slice()
    }
    setMovieData(temp)
  }


  useEffect(() => {
    const url = "https://swapi.dev/api/films/?format=json";
    fetch(url)
      .then((response) => response.json())
      .then((json) => setMovieData(json['results']))
      .catch((error) => console.log(error));
  }, []);

  return (
    <div className="App">
      <span style={{float: 'left'}}>
        <label for="episodes">Choose a sorting option: </label>
        <select name="episodes" id="episodes" onChange={(e) => applySort(e.target.value)} data-testid='dropdown'>
          <option>Not selected</option>
          <option>Year</option>
          <option>Episode</option>
        </select>
      </span>
      <TextField
        id="input-with-icon-textfield"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
        }}
        variant="standard"
        onChange={e => findMovie(e.target.value)}
        placeholder="type to search"
      />
      {movieData && movieData.length > 0 &&
          <SplitPane className="split-pane-row">
            <SplitPaneLeft>
              <SplitPane className="split-pane-col">
                <SplitPaneTop movieData={movieData} setCurrMovie={setCurrMovie} currMovie={currMovie} />
              </SplitPane>
            </SplitPaneLeft>
            <Divider className="separator-col" />
            <SplitPaneRight  movieData={movieData} setCurrMovie={setCurrMovie} currMovie={currMovie} />
          </SplitPane>
      }
    </div>
  );
}

export default App;
