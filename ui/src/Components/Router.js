import React, { useEffect, useState } from "react";
import clsx from "clsx";
import Grid from "@material-ui/core/Grid";
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
import HomeWorkIcon from "@material-ui/icons/HomeWork";
import AirportShuttleIcon from "@material-ui/icons/AirportShuttle";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Main from "./Main";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import InfoIcon from "@material-ui/icons/Info";
import Daily from "./Daily";

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
    position: "fixed",
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
    overflow: "hidden",
  },
  drawerHeader: {
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
    justifyContent: "flex-end",
  },
  content: {
    flexGrow: -1,
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
  homeIcon: { color: "white", position: "fixed" },
  appBarIcons: { color: "white", position: "relative" },
  homeIconText: { left: 20, position: "relative" },
  appBarIconText: { left: -10, position: "relative" },
  dropdownLabel: { color: "rgba(255, 255, 255, 0.7)" },
  formControlDistrict: {
    marginLeft: 50,
    marginRight: 50,
    paddingBottom: 2,
    width: 200,
    position: "relative",
  },
  formControlHospital: {
    marginLeft: 50,
    marginRight: 50,
    paddingBottom: 2,
    width: 200,
    position: "relative",
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
    color: "rgba(255, 255, 255, 0.7)",
  },
  welcome: { margin: 10, marginLeft: 40, position: "relative" },
  hello: {
    color: "rgba(255, 255, 255, 0.7)",
    margin: 60,
    marginTop: theme.spacing(20),
    position: "absolute",
  },
  chart: {
    marginTop: theme.spacing(16),
    position: "absolute",
    color: "rgba(255, 255, 255, 0.7)",
    margin: 60,
    width: "50%",
  },
  welcomeHeaderGap: {
    marginTop: 10,
    marginBottom: 60,
  },
  welcomeParaGap: {
    marginTop: 20,
  },
  welcomeAuthorGap: {
    marginTop: 180,
  },
  whiteLink: {
    color: "white",
  },
}));

const Router = () => {
  const classes = useStyles();
  const [openDrawer, setOpenDrawer] = useState(false);
  const [showHospital, setShowHospital] = useState(false);
  const [showSafeHome, setShowSafeHome] = useState(false);
  const [showInfo, setShowInfo] = useState(false);
  const [showAmbulance, setShowAmbulance] = useState(false);
  const [showHome, setShowHome] = useState(true);
  const [header, setHeader] = useState("Welcome to Covid Hospital Details");

  const [selectedDistrictHospital, setSelectedDistrictHospital] = useState("");
  const [selectedDistrictSafeHome, setSelectedDistrictSafeHome] = useState("");
  const [selectedDistrictAmbulance, setSelectedDistrictAmbulance] =
    useState("");

  const [hospitalType, setHospitalType] = useState("");
  const defaultType = "data";

  const [districtsHospital, setDistrictsHospital] = useState([]);
  const [districtsSafeHome, setDistrictsSafeHome] = useState([]);
  const [districtsAmbulance, setDistrictsAmbulance] = useState([]);

  const [hospitalsData, setHospitalsData] = useState([]);
  const [safeHomesData, setSafeHomesData] = useState([]);
  const [ambulancesData, setAmbulancesData] = useState([]);

  const [hospitalsDataUpdatedAt, setHospitalsDataUpdatedAt] = useState("");
  const [safeHomesDataUpdatedAt, setSafeHomesDataUpdatedAt] = useState("");
  const [ambulancesDataUpdatedAt, setAmbulancesDataUpdatedAt] = useState("");

  const handleDrawerOpen = () => {
    setOpenDrawer(true);
  };

  const handleShowHome = () => {
    setShowHospital(false);
    setShowInfo(false);
    setShowSafeHome(false);
    setShowAmbulance(false);
    setShowHome(true);
    setHeader("Home");
    setOpenDrawer(false);
  };

  const handleShowHospitals = () => {
    setShowInfo(false);
    setShowHome(false);
    setShowSafeHome(false);
    setShowAmbulance(false);
    setShowHospital(true);
    setHeader("Hospital");
    setOpenDrawer(false);
  };

  const handleShowSafeHome = () => {
    setShowInfo(false);
    setShowHome(false);
    setShowHospital(false);
    setShowAmbulance(false);
    setShowSafeHome(true);
    setHeader("Safe Home");
    setOpenDrawer(false);
  };

  const handleShowAmbulance = () => {
    setShowInfo(false);
    setShowHome(false);
    setShowHospital(false);
    setShowSafeHome(false);
    setShowAmbulance(true);
    setHeader("Ambulance");
    setOpenDrawer(false);
  };

  const handleShowInfo = () => {
    setShowHospital(false);
    setShowHome(false);
    setShowSafeHome(false);
    setShowAmbulance(false);
    setShowInfo(true);
    setHeader("Extra Information");
    setOpenDrawer(false);
  };

  const handleDistrictChangeAmbulance = (event) => {
    setSelectedDistrictAmbulance(event.target.value);
  };

  const handleDistrictChangeHospital = (event) => {
    setSelectedDistrictHospital(event.target.value);
  };

  const handleDistrictChangeSafeHome = (event) => {
    setSelectedDistrictSafeHome(event.target.value);
  };

  const handleHospitalChange = (event) => {
    setHospitalType(event.target.value);
  };

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_BASE_URL}/v3/address/hospitals/`).then(
      (response) => {
        if (response.ok) {
          response.json().then((response) => {
            setDistrictsHospital(Object.keys(response.hospitals));
            setHospitalsData(response.hospitals);
            setHospitalsDataUpdatedAt(response.updated_at);
          });
        }
      }
    );
  }, []);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_BASE_URL}/v3/address/safehomes/`).then(
      (response) => {
        if (response.ok) {
          response.json().then((response) => {
            setDistrictsSafeHome(Object.keys(response.safe_homes));
            setSafeHomesData(response.safe_homes);
            setSafeHomesDataUpdatedAt(response.updated_at);
          });
        }
      }
    );
  }, []);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_BASE_URL}/v3/address/ambulances/`).then(
      (response) => {
        if (response.ok) {
          response.json().then((response) => {
            setDistrictsAmbulance(Object.keys(response.ambulances));
            setAmbulancesData(response.ambulances);
            setAmbulancesDataUpdatedAt(response.updated_at);
          });
        }
      }
    );
  }, []);

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        data-test={"hook-app-bar"}
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: openDrawer,
        })}
      >
        <Toolbar>
          <Grid container spacing={0}>
            <Grid item xs={12}>
              <Grid container>
                <IconButton
                  data-test={"hook-open-drawer-icon"}
                  color="inherit"
                  aria-label="open drawer"
                  onClick={handleDrawerOpen}
                  edge="start"
                  className={clsx(
                    classes.menuButton,
                    openDrawer && classes.hide
                  )}
                >
                  <MenuIcon />
                </IconButton>
                <Typography variant="h6" className={classes.welcome} noWrap>
                  {header}
                </Typography>
                {showHospital && (
                  <FormControl className={classes.formControlDistrict}>
                    <InputLabel
                      data-test={"hook-district-dropdown-label"}
                      className={classes.dropdownLabel}
                      shrink
                      id="label-district"
                    >
                      District
                    </InputLabel>
                    <Select
                      data-test={"hook-district-dropdown"}
                      labelId="district"
                      id="select-district"
                      value={selectedDistrictHospital}
                      onChange={handleDistrictChangeHospital}
                      displayEmpty
                      className={classes.selectEmpty}
                    >
                      {districtsHospital.map((each, key) => (
                        <MenuItem
                          data-test={`hook-district-option-${each}`}
                          value={each}
                          key={key}
                        >
                          {each}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                )}
                {showHospital && (
                  <FormControl className={classes.formControlHospital}>
                    <InputLabel
                      data-test={`hook-hospital-type-dropdown-label`}
                      className={classes.dropdownLabel}
                      shrink
                      id="label-hospital"
                    >
                      Hospital Type
                    </InputLabel>
                    <Select
                      data-test={`hook-hospital-type-dropdown`}
                      labelId="government"
                      id="select-government"
                      value={hospitalType}
                      onChange={handleHospitalChange}
                      displayEmpty
                      className={classes.selectEmpty}
                    >
                      <MenuItem
                        value="govt"
                        key="Government"
                        data-test={`hook-hospital-type-option-govt`}
                      >
                        Government
                      </MenuItem>
                      <MenuItem
                        value="pvt"
                        key="Private"
                        data-test={`hook-hospital-type-option-pvt`}
                      >
                        Private
                      </MenuItem>
                      <MenuItem
                        value="requisitioned"
                        key="Requisitioned"
                        data-test={`hook-hospital-type-option-requ`}
                      >
                        Government Requisitioned
                      </MenuItem>
                    </Select>
                  </FormControl>
                )}
                {showSafeHome && (
                  <FormControl className={classes.formControlDistrict}>
                    <InputLabel
                      data-test={`hook-safe-home-dropdown-label`}
                      className={classes.dropdownLabel}
                      shrink
                      id="label-district"
                    >
                      District
                    </InputLabel>
                    <Select
                      data-test={`hook-safe-home-dropdown`}
                      labelId="district"
                      id="select-district"
                      value={selectedDistrictSafeHome}
                      onChange={handleDistrictChangeSafeHome}
                      displayEmpty
                      className={classes.selectEmpty}
                    >
                      {districtsSafeHome.map((each, key) => (
                        <MenuItem
                          value={each}
                          key={key}
                          data-test={`hook-safe-home-option-${each}`}
                        >
                          {each}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                )}
                {showAmbulance && (
                  <FormControl className={classes.formControlDistrict}>
                    <InputLabel
                      data-test={`hook-safe-ambulance-dropdown-label`}
                      className={classes.dropdownLabel}
                      shrink
                      id="label-district"
                    >
                      District
                    </InputLabel>
                    <Select
                      data-test={`hook-safe-ambulance-dropdown`}
                      labelId="district"
                      id="select-district"
                      value={selectedDistrictAmbulance}
                      onChange={handleDistrictChangeAmbulance}
                      displayEmpty
                      className={classes.selectEmpty}
                    >
                      {districtsAmbulance.map((each, key) => (
                        <MenuItem
                          value={each}
                          key={key}
                          data-test={`hook-safe-ambulance-option-${each}`}
                        >
                          {each}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                )}
              </Grid>
            </Grid>
          </Grid>
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
              <HomeIcon
                className={classes.homeIcon}
                data-test={`hook-home-icon`}
              />
            </IconButton>
            <ListItemText className={classes.homeIconText} primary="Home" />
          </ListItem>
          <Divider />
          <ListItem button onClick={handleShowAmbulance} key="Ambulance">
            <ListItemIcon>
              <AirportShuttleIcon
                className={classes.appBarIcons}
                data-test={`hook-ambulance-icon`}
              />
            </ListItemIcon>
            <ListItemText
              className={classes.appBarIconText}
              primary="Ambulance"
            />
          </ListItem>
          <ListItem button onClick={handleShowHospitals} key="Hospitals">
            <ListItemIcon>
              <LocalHospitalIcon
                className={classes.appBarIcons}
                data-test={`hook-hospital-icon`}
              />
            </ListItemIcon>
            <ListItemText
              className={classes.appBarIconText}
              primary="Hospital"
            />
          </ListItem>
          <ListItem button onClick={handleShowSafeHome} key="SafeHomes">
            <ListItemIcon>
              <HomeWorkIcon
                className={classes.appBarIcons}
                data-test={`hook-safe-home-icon`}
              />
            </ListItemIcon>
            <ListItemText
              className={classes.appBarIconText}
              primary="Safe Home"
            />
          </ListItem>
          <Divider />
          <ListItem button onClick={handleShowInfo} key="AdditionalInformation">
            <ListItemIcon>
              <InfoIcon
                className={classes.appBarIcons}
                data-test={`hook-extra-info-icon`}
              />
            </ListItemIcon>
            <ListItemText
              className={classes.appBarIconText}
              primary="Extra Info"
            />
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
      {showAmbulance && (
        <Main
          data={ambulancesData}
          selectedDistrict={selectedDistrictAmbulance}
          type={defaultType}
          cardType={2}
          dataUpdatedAt={ambulancesDataUpdatedAt}
          pleaseSelectText={"Please select District."}
        />
      )}
      {showHospital && (
        <Main
          data={hospitalsData}
          selectedDistrict={selectedDistrictHospital}
          type={hospitalType}
          cardType={1}
          dataUpdatedAt={hospitalsDataUpdatedAt}
          pleaseSelectText={"Please select District and Hospital Type."}
        />
      )}
      {showSafeHome && (
        <Main
          data={safeHomesData}
          selectedDistrict={selectedDistrictSafeHome}
          type={defaultType}
          cardType={1}
          dataUpdatedAt={safeHomesDataUpdatedAt}
          pleaseSelectText={"Please select District."}
        />
      )}
      {showHome && (
        <div className={classes.hello}>
          <Typography
            className={classes.welcomeHeaderGap}
            variant="body1"
            component="p"
          >
            Welcome,
          </Typography>
          <Typography
            className={classes.welcomeParaGap}
            variant="body1"
            component="p"
          >
            We have developed this application to help users find suitable
            hospitals and safe homes in West Bengal, that have available beds
            for Covid patients.
          </Typography>
          <Typography
            className={classes.welcomeParaGap}
            variant="body1"
            component="p"
          >
            This application provides district wise data, for both government,
            private and government requisitioned hospitals and safe homes. Users
            can get directions to the hospital or safe home, call the hospital
            or safe home, register for beds in the hospital or safe home.
            Additionally, last update date and time has been provided for
            convenience. District-wise ambulance details have also been
            provided.
          </Typography>
          <Typography
            className={classes.welcomeParaGap}
            variant="body1"
            component="p"
          >
            Disclaimer - All data is provided by the honourable{" "}
            {
              <a
                className={classes.whiteLink}
                href="http://www.wbhealth.gov.in/"
                target="_blank"
                rel="noreferrer"
              >
                Government of West Bengal
              </a>
            }
            . We claim no ownership of the data. We will add other states in
            India to the application, as and when we find reliable data sources
            from states.
          </Typography>
          <Typography
            className={classes.welcomeAuthorGap}
            variant="body2"
            component="p"
          >
            Authors -{" "}
            {
              <a
                className={classes.whiteLink}
                href="https://www.linkedin.com/in/piyu-paul-9a059299/"
                target="_blank"
                rel="noreferrer"
              >
                Piyu Paul
              </a>
            }
            ,{" "}
            {
              <a
                className={classes.whiteLink}
                href="https://www.facebook.com/profile.php?id=100010634407989"
                target="_blank"
                rel="noreferrer"
              >
                Rimi Ghosh
              </a>
            }
            ,{" "}
            {
              <a
                className={classes.whiteLink}
                href="https://www.linkedin.com/in/subhasish-ghosh-00102897/"
                target="_blank"
                rel="noreferrer"
              >
                Subhasish Ghosh
              </a>
            }
            ,{" "}
            {
              <a
                className={classes.whiteLink}
                href="https://www.linkedin.com/in/sk-asik/"
                target="_blank"
                rel="noreferrer"
              >
                Sk Asik
              </a>
            }
            ,{" "}
            {
              <a
                className={classes.whiteLink}
                href="https://mobile.twitter.com/debdutta91"
                target="_blank"
                rel="noreferrer"
              >
                Deb Dutta
              </a>
            }
            ,{" "}
            {
              <a
                className={classes.whiteLink}
                href="https://www.linkedin.com/in/manmohan-singh-81259589/"
                target="_blank"
                rel="noreferrer"
              >
                Manmohan Singh
              </a>
            }
            ,{" "}
            {
              <a
                className={classes.whiteLink}
                href="https://www.linkedin.com/in/sourabh-paul-45b9b0132/"
                target="_blank"
                rel="noreferrer"
              >
                Sourabh Paul
              </a>
            }
            .
          </Typography>
        </div>
      )}
      {showInfo && (
        <div className={classes.chart}>
          <Daily />
        </div>
      )}
    </div>
  );
};

export default Router;
