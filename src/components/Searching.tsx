import { Box, CircularProgress, TextField } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import axios from "axios";
import React, { ChangeEvent, FormEvent, useState } from "react";
import ICompanyData from "../interfaces/ICompanyData";
import Suggestion from "./Suggestion";

interface ISearching {
  addCompanyFcn: (data: ICompanyData) => void;
}

interface IResponse {
  bestMatches: ICompanyData[];
}

const styles = {
  container: {
    width: "40%",
    height: "70%",
  },
  loadingContainer: {
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
  },
};
const useStyles = makeStyles(styles);

function Searching(props: ISearching) {
  const classes = useStyles();
  const [searchPhrase, setSearchPhrase] = useState("");
  const [suggestions, setSuggestions] = useState<ICompanyData[]>([]);
  const [loading, setLoading] = useState(false);

  const updatePhrase = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchPhrase(e.target.value);
  };

  const getData = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const requestLink = `https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${searchPhrase}&apikey=${process.env.REACT_APP_API_KEY}`;
    const response = await axios.get<IResponse>(requestLink);
    setSuggestions(response.data.bestMatches);
    setLoading(false);
  };

  return (
    <Box display="flex" flexDirection="column" className={classes.container}>
      <form onSubmit={getData}>
        <TextField
          variant="outlined"
          fullWidth
          id="standard-basic"
          placeholder="Search company"
          onChange={updatePhrase}
          value={searchPhrase}
        />
      </form>
      {/* check if app is loading data. Next, check if there are any results */}
      {loading ? (
        <Box display="flex" className={classes.loadingContainer}>
          <CircularProgress />
        </Box>
      ) : suggestions.length > 0 ? (
        <>
          <p>Results:</p>
          {suggestions.map((item, index) => (
            <Suggestion
              addEvent={props.addCompanyFcn}
              data={item}
              key={index}
            />
          ))}
        </>
      ) : (
        <p>No results</p>
      )}
    </Box>
  );
}

export default Searching;
