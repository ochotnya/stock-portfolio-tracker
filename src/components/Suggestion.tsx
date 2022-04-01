import Button from "@material-ui/core/Button";
import React from "react";
import ICompanyData from "../interfaces/ICompanyData";
import AddIcon from "@mui/icons-material/Add";
import { makeStyles } from "@material-ui/styles";

interface ISuggestion {
  data: ICompanyData;
  addEvent: (data: ICompanyData) => void;
}

const styles = {
  container: {
    borderRadius: "5px",
    transition: "ease-in-out 100ms",
    "&:hover": {
      backgroundColor: "rgb(233, 233, 233)",
    },
  },
  suggestion: {
    margin: "5px",
    paddingLeft: "5px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    color: "rgb(68, 68, 68)",
    lineHeight: "1.5rem",
  },
};

const useStyles = makeStyles(styles);

function Suggestion(props: ISuggestion) {
  const classes = useStyles();

  const addButtonClick = () => {
    props.addEvent(props.data);
  };

  return (
    <div className={classes.container}>
      <div className={classes.suggestion}>
        {props.data["1. symbol"]} - {props.data["2. name"]}
        <Button onClick={addButtonClick}>
          <AddIcon />
        </Button>
      </div>
    </div>
  );
}

export default Suggestion;
