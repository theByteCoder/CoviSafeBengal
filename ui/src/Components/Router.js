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
  hospitalIcon: { color: "white", position: "relative" },
  homeIconText: { left: 20, position: "relative" },
  hospitalIconText: { left: -10, position: "relative" },
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
    margin: 100,
    marginTop: theme.spacing(23),
    position: "absolute",
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
  const [header, setHeader] = useState("Welcome to Covid Hospital Details");
  const handleDrawerOpen = () => {
    setOpenDrawer(true);
  };

  const handleShowHome = () => {
    if (showHospital === true) {
      setShowHospital(false);
    }
    setHeader("Home");
    setOpenDrawer(false);
  };

  const handleShowHospitals = () => {
    if (showHospital === false) {
      setShowHospital(true);
    }
    setHeader("Hospitals");
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
    fetch("https://53c2ed098d40.ngrok.io/address/all/").then((response) => {
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
          <Grid container spacing={0}>
            <Grid item xs={12}>
              <Grid container>
                <IconButton
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
              <HomeIcon className={classes.homeIcon} />
            </IconButton>
            <ListItemText className={classes.homeIconText} primary="Home" />
          </ListItem>
          <Divider />
          <ListItem button onClick={handleShowHospitals} key="Hospitals">
            <ListItemIcon>
              <LocalHospitalIcon className={classes.hospitalIcon} />
            </ListItemIcon>
            <ListItemText
              className={classes.hospitalIconText}
              primary="Hospitals"
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
      {showHospital ? (
        <Main
          allData={allData}
          selectedDistrict={selectedDistrict}
          hospitalType={hospitalType}
        />
      ) : (
        <div className={classes.hello}>
          <Typography
            className={classes.welcomeHeaderGap}
            variant="body1"
            component="p"
          >
            Welcome to Covid hospital details for West Bengal, India.
          </Typography>
          <Typography
            className={classes.welcomeParaGap}
            variant="body1"
            component="p"
          >
            We have developed this application to help find suitable hospitals,
            that have available beds for Covid patients.
          </Typography>
          <Typography
            className={classes.welcomeParaGap}
            variant="body1"
            component="p"
          >
            This application provides district wise data, for both government
            and private hospitals. Additionally, the address and directions to
            the hospital is also provides.
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
              >
                Government of West Bengal
              </a>
            }
            . We claim no ownership of the data.
          </Typography>
          <Typography
            className={classes.welcomeAuthorGap}
            variant="body2"
            component="p"
          >
            Authors - Subhasish Ghosh, Sk Asik, Deb Dutta, Manmohan Singh, Piyu
            Paul, Rimi Ghosh, Sourabh Paul.
          </Typography>
        </div>
      )}
    </div>
  );
};

export default Router;
