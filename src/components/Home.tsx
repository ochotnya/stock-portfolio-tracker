import React, { useState } from "react";
import { makeStyles } from "@material-ui/styles";
import ICompanyData from "../interfaces/ICompanyData";
import Searching from "./Searching";
import YourPortfolio from "./YourPortfolio";
import { Divider } from "@material-ui/core";

const styles = {
  root: {
    display: "flex",
    alignItems: "top",
    justifyContent: "center",
    height: "100vh",
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

  const addCompany = (newCompany: ICompanyData) => {
    setSavedCompanies([...savedCompanies, newCompany]);
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
      <div className={classes.root}>
        <Searching addCompanyFcn={addCompany} />
        <YourPortfolio deleteFcn={removeCompany} data={savedCompanies} />
      </div>
    </div>
  );
}

export default Home;
