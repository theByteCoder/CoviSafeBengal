import React, { useEffect, useState } from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import CssBaseline from "@material-ui/core/CssBaseline";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import HomeIcon from "@material-ui/icons/Home";
import LocalHospitalIcon from "@material-ui/icons/LocalHospital";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Main from "./Main";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";

const drawerWidth = 189;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    backgroundColor: "#333",
    color: "rgba(255, 255, 255, 0.7)",
  },
  appBar: {
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  hide: {
    display: "none",
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
    backgroundColor: "#424242",
    color: "rgba(255, 255, 255, 0.7)",
  },
  drawerHeader: {
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
    justifyContent: "flex-end",
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
  Icons: {
    color: "white",
    position: "fixed",
  },
  iconText: {
    top: 115,
  },
  dropdownLabel: {
    color: "rgba(255, 255, 255, 0.7)",
  },
  formControlDistrict: {
    left: 60,
    width: 200,
    position: "relative",
  },
  formControlHospital: {
    left: 80,
    width: 200,
    position: "relative",
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
    color: "rgba(255, 255, 255, 0.7)",
  },
  welcome: {
    position: "relative",
  },
}));

const Router = () => {
  const classes = useStyles();
  const [openDrawer, setOpenDrawer] = useState(false);
  const [showHospital, setShowHospital] = useState(false);

  const handleDrawerOpen = () => {
    setOpenDrawer(true);
  };

  const handleShowHome = () => {
    if (showHospital === true) {
      setShowHospital(false);
    }
    setOpenDrawer(false);
  };

  const handleShowHospitals = () => {
    if (showHospital === false) {
      setShowHospital(true);
    }
    setOpenDrawer(false);
  };

  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [hospitalType, setHospitalType] = useState("");

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
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: openDrawer,
        })}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, openDrawer && classes.hide)}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.welcome} noWrap>
            Welcome to Covid Hospital Details
          </Typography>
          {showHospital && (
            <FormControl className={classes.formControlDistrict}>
              <InputLabel
                className={classes.dropdownLabel}
                shrink
                id="label-district"
              >
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
          )}
          {showHospital && (
            <FormControl className={classes.formControlHospital}>
              <InputLabel
                className={classes.dropdownLabel}
                shrink
                id="label-hospital"
              >
                Hospital Type
              </InputLabel>
              <Select
                labelId="government"
                id="select-government"
                value={hospitalType}
                onChange={handleHospitalChange}
                displayEmpty
                className={classes.selectEmpty}
              >
                <MenuItem value="govt" key="Government">
                  Government
                </MenuItem>
                <MenuItem value="pvt" key="Private">
                  Private
                </MenuItem>
              </Select>
            </FormControl>
          )}
        </Toolbar>
      </AppBar>
      <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="left"
        open={openDrawer}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <List>
          <ListItem button onClick={handleShowHome} key="Home">
            <IconButton>
              <HomeIcon className={classes.Icons} />
            </IconButton>
            <ListItemText className={classes.iconText} primary="Home" />
          </ListItem>
        </List>
        <Divider />
        <List>
          <ListItem button onClick={handleShowHospitals} key="Hospitals">
            <ListItemIcon>
              <LocalHospitalIcon className={classes.Icons} />
            </ListItemIcon>
            <ListItemText className={classes.iconText} primary="Hospitals" />
          </ListItem>
        </List>
        <Divider />
      </Drawer>
      {showHospital && (
        <main
          className={clsx(classes.content, {
            [classes.contentShift]: openDrawer,
          })}
        >
          <div className={classes.drawerHeader} />
        </main>
      )}
      {showHospital && (
        <Main
          allData={allData}
          selectedDistrict={selectedDistrict}
          hospitalType={hospitalType}
        />
      )}
    </div>
  );
};

export default Router;
