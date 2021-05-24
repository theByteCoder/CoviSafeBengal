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
import InfoIcon from '@material-ui/icons/Info';
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
  chart: {
    color: "rgba(255, 255, 255, 0.7)",
    margin: 100,
    width: '50%'
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
  const [showInfo, setShowInfo] = useState(false);
  const [showHome, setShowHome] = useState(false);
  const [header, setHeader] = useState("Welcome to Covid Hospital Details");
  const handleDrawerOpen = () => {
    setOpenDrawer(true);
  };

  const handleShowHome = () => {
    setShowHospital(false);
    setShowInfo(false);
    setShowHome(true);
    setHeader("Home");
    setOpenDrawer(false);
  };

  const handleShowHospitals = () => {
    setShowInfo(false);
    setShowHome(false);
    setShowHospital(true);
    setHeader("Hospitals");
    setOpenDrawer(false);
  };

  const handleShowInfo = () => {
    setShowHospital(false);
    setShowHome(false);
    setShowInfo(true);
    setHeader("Extra Information");
    setOpenDrawer(false);
  };

  const handleView = () => {
    if(showHospital)
      return true;
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
    fetch("https://f30e157a8138.ngrok.io/v2/address/all/").then((response) => {
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
          <ListItem button onClick={handleShowInfo} key="Additional Information">
            <ListItemIcon>
              <InfoIcon className={classes.hospitalIcon} />
            </ListItemIcon>
            <ListItemText
              className={classes.hospitalIconText}
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
      {showHospital && (
        <Main
          allData={allData}
          selectedDistrict={selectedDistrict}
          hospitalType={hospitalType}
        />
      )}
      {showHome &&  (
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
            We have developed this application to help find suitable hospitals
            in West Bengal, that have available beds for Covid patients.
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
