import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 160,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

const TravelMode = ({ travelMode, handleSetMode }) => {
  const classes = useStyles();

  const handleChange = (event) => {
    handleSetMode(event.target.value);
  };

  return (
    <div>
      <FormControl className={classes.formControl}>
        <InputLabel shrink id="travel-mode">
          Travel Mode
        </InputLabel>
        <Select
          labelId="travel-mode"
          id="select-travel-mode"
          value={travelMode}
          onChange={handleChange}
          displayEmpty
          className={classes.selectEmpty}
        >
          <MenuItem value={"DRIVING"}>Driving</MenuItem>
          <MenuItem value={"WALKING"}>Walking</MenuItem>
          <MenuItem value={"BICYCLING"}>Bicycling</MenuItem>
          <MenuItem value={"TRANSIT"}>Transit</MenuItem>
        </Select>
      </FormControl>
    </div>
  );
};

export default TravelMode;
