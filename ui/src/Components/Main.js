import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import MapsController from "./MapsController";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import { isEmpty } from "lodash";

const useStyles = makeStyles((theme) => ({
  parent: {
    background: "#FFDEAD",
  },
  formControlDropdown: {
    margin: theme.spacing(1),
    width: 160,
  },
  formControlRadio: {
    top: 10,
    margin: theme.spacing(1),
    width: 400,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

const Main = () => {
  const classes = useStyles();

  const [selectedDistrict, setSelectedDistrict] = useState("Kolkata");
  const [hospitalType, setHospitalType] = useState("govt");

  const [districts, setDistricts] = useState([]);
  const [allData, setAllData] = useState([]);

  const handleDistrictChange = (event) => {
    setSelectedDistrict(event.target.value);
  };

  const handleHospitalChange = (event) => {
    setHospitalType(event.target.value);
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
      <FormControl className={classes.formControlDropdown}>
        <InputLabel shrink id="label-district">
          District
        </InputLabel>
        <Select
          labelId="district"
          id="select-district"
          value={selectedDistrict}
          onChange={handleDistrictChange}
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
      <FormControl className={classes.formControlRadio} component="fieldset">
        <RadioGroup
          row
          aria-label="position"
          name="position"
          defaultValue="govt"
          onChange={handleHospitalChange}
        >
          <FormControlLabel
            value="govt"
            control={<Radio color="primary" />}
            label="Government Hospitals"
          />
          <FormControlLabel
            value="pvt"
            control={<Radio color="primary" />}
            label="Private Hospitals"
          />
        </RadioGroup>
      </FormControl>
      {!isEmpty(allData) && selectedDistrict.length && hospitalType.length && (
        <MapsController
          allData={allData}
          selectedDistrict={selectedDistrict}
          type={hospitalType}
        />
      )}
    </div>
  );
};

export default Main;
