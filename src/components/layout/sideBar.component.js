import React, { useEffect, useState } from "react";
import { withStyles } from "@material-ui/core/styles";
import {
  Drawer,
  CssBaseline,
  List,
  ListItem,
  ListItemText,
} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import Hidden from "@material-ui/core/Hidden";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import Fab from "@material-ui/core/Fab";
import { customURL } from "../../utils/helperFunctions";
import axios from "axios";
import { useSelector } from "react-redux";

const drawerWidth = 200;

const styles = (theme) => ({
  root: {
    display: "flex",
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
    top: "auto",
    border: "none",
    position: "absolute",
    [theme.breakpoints.up("md")]: {
      height: "max-content",
    },
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,

  sideBarText: {
    color: theme.palette.primary.main,
  },
  activeNav: {
    backgroundColor: theme.palette.secondary.main,
  },
  menuButton: {
    margin: theme.spacing(2),
  },
});

const SideBar = ({
  classes,
  selectedMenu,
  viewSelectedAd,
  getAdInfoFromSideMenu,
  applications,
  match,
  fetchedPosts,
}) => {
  const { t } = useTranslation("navbar");
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [jobsToRender, setJobsToRender] = useState([]);
  const [applicant, setApplicant] = useState({})
  const { id } = useSelector((state) => state.jobs);
  const selectedPage = 1;

  useEffect(() => {
    axios.get(`https://localhost:7262/jobsEn/${id}`).then((res) => {
      setJobsToRender(res.data);
      setApplicant(res.data.jobPostApplications)
    });
  }, []);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <div className={classes.toolbar}>
      <div className={classes.toolbar} />
      <CssBaseline />
      {viewSelectedAd.length !== 0 && (
        <List>
          <Link
            className="btnLink"
            to={customURL(viewSelectedAd.url, "internal")}
          >
            <ListItem
              value={0}
              button
              className={
                selectedMenu === 0 ? classes.activeNav : classes.inactiveNav
              }
              onClick={() => getAdInfoFromSideMenu(0)}
            >
              <ListItemText
                primary={t("post")}
                className={classes.sideBarText}
              />
            </ListItem>
          </Link>
          <Link
            className="btnLink"
            to={customURL(viewSelectedAd.url, "internal")}
          >
            <ListItem
              value={1}
              button
              className={
                selectedMenu === 1 ? classes.activeNav : classes.inactiveNav
              }
              onClick={() => getAdInfoFromSideMenu(1)}
            >
              <ListItemText
                primary={`${t("applications")} (${
                  applications?.length
                })`}
                className={classes.sideBarText}
              />
            </ListItem>
          </Link>
          <Link
            className="btnLink"
            to={customURL(viewSelectedAd.url, "internal")}
          >
            <ListItem
              value={2}
              button
              className={
                selectedMenu === 2 ? classes.activeNav : classes.inactiveNav
              }
              onClick={() => getAdInfoFromSideMenu(2)}
            >
              <ListItemText
                primary={t("dashboard")}
                className={classes.sideBarText}
              />
            </ListItem>
          </Link>
        </List>
      )}
    </div>
  );

  return (
    <div className={classes.root}>
      <Hidden mdUp implementation="css">
        <Fab
          color="secondary"
          aria-label="open drawer"
          onClick={handleDrawerToggle}
          className={classes.menuButton}
        >
          <MenuIcon />
        </Fab>
        <Drawer
          variant="temporary"
          anchor="left"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          classes={{
            paper: classes.drawerPaper,
          }}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
        >
          {drawer}
        </Drawer>
      </Hidden>
      <Hidden smDown implementation="css">
        <Drawer
          classes={{
            paper: classes.drawerPaper,
          }}
          variant="permanent"
          open
        >
          {drawer}
        </Drawer>
      </Hidden>
    </div>
  );
};

export default withStyles(styles)(SideBar);
