import React, { useState } from "react";
import { makeStyles } from "@material-ui/styles";
import ICompanyData from "../interfaces/ICompanyData";
import Searching from "./Searching";
import YourPortfolio from "./YourPortfolio";
import { Box, Divider } from "@material-ui/core";
import useMediaQuery from "@mui/material/useMediaQuery";

const styles = {
  content: {
    alignItems: "top",
    justifyContent: "center",
    gap: "3rem",
    marginTop: "3rem",
  },
  container: {
    margin: "1rem",
  },
  header: {
    margin: "1rem",
    fontWeight: 500,
  },
};

const useStyles = makeStyles(styles);

function Home() {
  const classes = useStyles();
  const [savedCompanies, setSavedCompanies] = useState<ICompanyData[]>([]);
  const matches = useMediaQuery("(min-width:1000px)");

  const addCompany = (newCompany: ICompanyData) => {
    const filter = savedCompanies.filter(
      (item) => item["1. symbol"] === newCompany["1. symbol"]
    );
    if (filter.length === 0) setSavedCompanies([...savedCompanies, newCompany]);
  };

  const removeCompany = (symbol: string) => {
    let arrayCopy = JSON.parse(JSON.stringify(savedCompanies));
    const index = arrayCopy.findIndex(
      (item: ICompanyData) => item["1. symbol"] === symbol
    );
    arrayCopy.splice(index, 1);
    setSavedCompanies(arrayCopy);
  };

  return (
    <div className={classes.container}>
      <h1 className={classes.header}>My stocks</h1>
      <Divider />
      <Box
        display="flex"
        className={classes.content}
        flexDirection={matches ? "row" : "column"}
      >
        <Searching addCompanyFcn={addCompany} />
        <YourPortfolio deleteFcn={removeCompany} data={savedCompanies} />
      </Box>
    </div>
  );
}

export default Home;
