import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ICompanyDetails from "../interfaces/ICompanyDetails";
import { makeStyles } from "@material-ui/styles";
import { Box, CircularProgress, Divider, Paper } from "@material-ui/core";

const styles = {
  container: {
    padding: "20px",
    justifyContent: "center",
  },
  card: {
    width: "95%",
    maxWidth: "800px",
    padding: "1rem",
    lineHeight: "1.5rem",
  },
  cardFullWidth: {
    width: "90%",
    padding: "1rem",
    lineHeight: "1.5rem",
  },
  details: {
    marginTop: "1rem",
    fontSize: "0.9rem",
  },
  loadingContainer: {
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
  },
};
const useStyles = makeStyles(styles);

function CompanyDetails() {
  const classes = useStyles();
  const [loading, setLoading] = useState(true);
  const { symbol } = useParams();
  const [info, setInfo] = useState<ICompanyDetails>({
    Address: "none",
    Description: "none",
    MarketCapitalization: "0",
    Name: "none",
  });

  const url = `https://www.alphavantage.co/query?function=OVERVIEW&symbol=${symbol}&apikey=${process.env.REACT_APP_API_KEY}`;

  const loadData = async () => {
    const result = await axios.get(url);
    setInfo(result.data);
    setLoading(false);
  };

  const formatValue = (value: string) => {
    const valueNumber = parseInt(value);
    let formattedValue = valueNumber / 1000000000000;
    if (formattedValue > 0.01) return formattedValue.toFixed(2) + " bln";
    formattedValue = valueNumber / 1000000;
    return formattedValue.toFixed(2) + " mln";
  };
  useEffect(() => {
    loadData();
  }, []);

  return (
    <>
      {loading ? (
        <Box display="flex" className={classes.loadingContainer}>
          <CircularProgress />
        </Box>
      ) : (
        <Box display="flex" className={classes.container}>
          <Box
            display="flex"
            flexDirection="column"
            component={Paper}
            className={classes.card}
          >
            <h1>{info.Name}</h1>
            <Divider />
            <div className={classes.details}>Address: {info.Address}</div>
            <div className={classes.details}>
              Market Capitalization: {formatValue(info.MarketCapitalization)}
            </div>
            <p>{info.Description}</p>
          </Box>
        </Box>
      )}
    </>
  );
}

export default CompanyDetails;
