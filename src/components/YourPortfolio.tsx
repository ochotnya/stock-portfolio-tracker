import {
  Box,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  useMediaQuery,
} from "@material-ui/core";
import React from "react";
import ICompanyData from "../interfaces/ICompanyData";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { makeStyles } from "@material-ui/styles";
import Paper from "@material-ui/core/Paper";
import { useNavigate } from "react-router-dom";

interface IPortfolio {
  data: ICompanyData[];
  deleteFcn: (symbol: string) => void;
}

const styles = {
  container: {
    width: "40%",
    height: "70%",
  },
  fullWidth: {
    width: "100%",
    maxHeight: "70%",
  },
  head: {
    backgroundColor: "rgb(85, 182, 238)",
  },
  headerText: {
    color: "white",
    fontSize: "1rem",
    fontWeight: 800,
  },
  row: {
    cursor: "pointer",
    "&:nth-child(even)": { backgroundColor: "rgb(236, 236, 236)" },
    "&:hover": { backgroundColor: "rgb(175, 243, 255)" },
  },
};

const useStyles = makeStyles(styles);

function YourPortfolio(props: IPortfolio) {
  const classes = useStyles();
  const navigate = useNavigate();
  const matches = useMediaQuery("(min-width:1000px)");

  return (
    <Box
      display="flex"
      flexDirection="column"
      className={matches ? classes.container : classes.fullWidth}
    >
      <TableContainer component={Paper}>
        <Table>
          <TableHead className={classes.head}>
            <TableRow>
              <TableCell className={classes.headerText}>Company name</TableCell>
              <TableCell className={classes.headerText} align="left">
                Symbol
              </TableCell>
              <TableCell className={classes.headerText} align="left">
                Actions
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {props.data.map((item, index) => (
              <TableRow key={index} className={classes.row}>
                <TableCell
                  onClick={() =>
                    navigate(`/companydetails/${item["1. symbol"]}`)
                  }
                >
                  {item["2. name"]}
                </TableCell>
                <TableCell align="right">{item["1. symbol"]}</TableCell>
                <TableCell align="right">
                  <Button onClick={() => props.deleteFcn(item["1. symbol"])}>
                    <DeleteForeverIcon />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}

export default YourPortfolio;
