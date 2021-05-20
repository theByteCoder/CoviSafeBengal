import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import MapsController from "./MapsController";

const useStyles = makeStyles((theme) => ({
  parent: {
    background: "#FFDEAD",
  },
  formControl: {
    margin: theme.spacing(1),
    width: 160,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

const Main = () => {
  const classes = useStyles();
  const [selectedDistrict, setSelectedDistrict] = useState("None");
  const [districts, setDistricts] = useState([]);
  const [allData, setAllData] = useState([]);
  const [showData, setShowData] = useState(false);

  const handleChange = (event) => {
    setSelectedDistrict(event.target.value);
    setShowData(true);
  };

  useEffect(() => {
    fetch("http://127.0.0.1:7070/address/all/").then((response) => {
      if (response.ok) {
        response.json().then((response) => {
          setDistricts(Object.keys(response.response));
          setAllData(response.response);
        });
      }
    });
  }, []);

  return (
    <div className={classes.parent}>
      <FormControl className={classes.formControl}>
        <InputLabel shrink id="label-district">
          District
        </InputLabel>
        <Select
          labelId="district"
          id="select-district"
          value={selectedDistrict}
          onChange={handleChange}
          displayEmpty
          className={classes.selectEmpty}
        >
          {districts.map((each, key) => (
            <MenuItem value={each} key={key}>
              {each}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      {showData && (
        <MapsController
          allData={allData}
          selectedDistrict={selectedDistrict}
          type="govt"
        />
      )}
    </div>
  );
};

export default Main;
