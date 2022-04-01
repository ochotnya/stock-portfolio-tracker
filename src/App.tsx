import React from "react";
import "./App.css";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/styles";

const styles = {
  root: {
    background: "blue",
    border: "10px solid black",
  },
};

const useStyles = makeStyles(styles);

function App() {
  const classes = useStyles();
  return (
    <div className="App">
      <Button className={classes.root}>test</Button>
    </div>
  );
}

export default App;
