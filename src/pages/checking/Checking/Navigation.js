import React, { useState, useEffect } from "react";
import { fade, makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import InputBase from "@material-ui/core/InputBase";
import Badge from "@material-ui/core/Badge";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import MenuIcon from "@material-ui/icons/Menu";
import SearchIcon from "@material-ui/icons/Search";
import AccountCircle from "@material-ui/icons/AccountCircle";
import MailIcon from "@material-ui/icons/Mail";
import NotificationsIcon from "@material-ui/icons/Notifications";
import MoreIcon from "@material-ui/icons/MoreVert";
import HeadsetMicIcon from "@material-ui/icons/HeadsetMic";
import HomeIcon from "@material-ui/icons/Home";
import VideocamIcon from "@material-ui/icons/Videocam";
import NotInterestedIcon from "@material-ui/icons/NotInterested";
import SettingsIcon from "@material-ui/icons/Settings";
import MapIcon from "@material-ui/icons/Map";
import PublishIcon from "@material-ui/icons/Publish";
import FeedbackIcon from "@material-ui/icons/Feedback";

import {
  Button,
  Divider,
  Drawer,
  List,
  ListItem,
  withStyles,
} from "@material-ui/core";
import clsx from "clsx";
import { Link, NavLink, useHistory } from "react-router-dom";
import logo from "../../../images/kpl-logo.png";
import {
  changeCTR,
  ctrDropDown,
  getStitchingNotification,
  removeNotification,
} from "../../../services/api.service";
import ClpCtrDialog from "../../../components/clpCtrDialog/ClpCtrDialog";
import { KPLContext } from "../../../context/ViolationContext";
import ProfileBox from "../../../components/profileBox/ProfileBox";

const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "block",
    },
  },
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(3),
      width: "auto",
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  inputRoot: {
    color: "inherit",
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
  sectionDesktop: {
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "flex",
    },
  },
  sectionMobile: {
    display: "flex",
    [theme.breakpoints.up("sm")]: {
      display: "none",
    },
  },
  list: {
    width: 250,
  },
  fullList: {
    width: "auto",
  },
  link: {
    textDecoration: "none",
    padding: "12px 16px",
    color: "#0e4a7b",
    width: "100%",
    borderRadius: "6px",
    display: "flex",
    alignItems: "center",
  },
  active: {
    backgroundColor: "#f68f1d",
    color: "white",
  },
  icon: {
    marginRight: "12px",
  },
}));

export default function Navigation() {
  const history = useHistory();

  const { dispatch } = React.useContext(KPLContext);

  // CUSTOM NOTIFICATION FUNCTION
  const [ctrDrop, setCtrDrop] = React.useState();
  const [open, setOpen] = React.useState(false);
  const [CTR, setCTR] = React.useState({
    currentCtr: "",
    clpctr: "",
    wing: "",
    line: "",
    resourceId: "",
    startTime: new Date().toLocaleTimeString().slice(0, 5),
  });
  const [notification, setNotification] = useState([]);
  const [openProfile, setOpenProfile] = React.useState(false);

  const handleClickOpenProfile = () => {
    setOpenProfile(true);
  };
  const handleCloseProfile = () => {
    setOpenProfile(false);
  };

  const loadData = async () => {
    try {
      const ctr = await ctrDropDown();
      console.log(ctr);
      setCtrDrop(ctr);
      const notification = await getStitchingNotification();
      console.log(notification.data);
      setNotification(notification.data);
    } catch (err) {}
  };
  const handleClickOpenCTR = () => {
    setOpen(true);
  };

  const handleCloseCTR = () => {
    setOpen(false);
  };
  React.useEffect(() => {
    loadData();
  }, []);
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const list = (anchor) => (
    <div
      className={clsx(classes.list, {
        [classes.fullList]: anchor === "top" || anchor === "bottom",
      })}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        <ListItem button>
          <NavLink
            activeClassName={classes.active}
            className={classes.link}
            to="/checking/home"
          >
            <HomeIcon className={classes.icon} />
            Home
          </NavLink>
        </ListItem>
        <Divider />
        <ListItem button>
          <NavLink
            activeClassName={classes.active}
            className={classes.link}
            to="/checking/violationLog"
          >
            <NotInterestedIcon className={classes.icon} />
            Violation Log
          </NavLink>
        </ListItem>
        <Divider />
        <ListItem button>
          <NavLink
            activeClassName={classes.active}
            className={classes.link}
            to="/checking/videoWall"
          >
            <VideocamIcon className={classes.icon} />
            Video Wall
          </NavLink>
        </ListItem>
        <Divider />
        <ListItem button>
          <NavLink
            activeClassName={classes.active}
            className={classes.link}
            to="/checking/layoutView"
          >
            <MapIcon className={classes.icon} />
            Layout View
          </NavLink>
        </ListItem>
        <Divider />
        <ListItem button>
          <NavLink
            activeClassName={classes.active}
            className={classes.link}
            to="/checking/setting"
          >
            <SettingsIcon className={classes.icon} />
            Setting
          </NavLink>
        </ListItem>
        <Divider />
        <ListItem button>
          <NavLink
            activeClassName={classes.active}
            className={classes.link}
            to="/checking/yourData"
          >
            <PublishIcon className={classes.icon} />
            Your Data
          </NavLink>
        </ListItem>
        <Divider />
        <ListItem button>
          <NavLink
            activeClassName={classes.active}
            className={classes.link}
            to="/checking/feedback"
          >
            <FeedbackIcon className={classes.icon} />
            Feedback
          </NavLink>
        </ListItem>
        <Divider />
      </List>
    </div>
  );

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const menuId = "primary-search-account-menu";
  const logout = () => {
    dispatch({ type: "ADD_ROLE", payload: "" });
    localStorage.removeItem("ROLE");
    dispatch({
      type: "ADD_DESIGNATION",
      payload: "",
    });
    localStorage.removeItem("DESIGNATION");
    localStorage.removeItem("KPL Auth");
    history.push("/");
  };
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleClickOpenProfile}>Profile</MenuItem>
      <MenuItem onClick={logout}>Logout</MenuItem>
    </Menu>
  );
  const SupportButton = withStyles((theme) => ({
    root: {
      color: "#0e4a7b",
      backgroundColor: "white",
      border: "2px solid #0e4a7b",
      margin: "0 8px",
      "&:hover": {
        backgroundColor: "#0e4a7b",
        color: "white",
        border: "2px solid #0e4a7b",
      },
    },
  }))(Button);
  const mobileMenuId = "primary-search-account-menu-mobile";
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      {/* <MenuItem>
        <IconButton aria-label="show 4 new mails" color="inherit">
          <Badge badgeContent={4} color="secondary">
            <MailIcon />
          </Badge>
        </IconButton>
        <p>Messages</p>
      </MenuItem> */}
      <MenuItem>
        <IconButton aria-label="show 11 new notifications" color="inherit">
          <Badge badgeContent={11} color="secondary">
            <NotificationsIcon />
          </Badge>
        </IconButton>
        <p>Notifications</p>
      </MenuItem>
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <p>Profile</p>
      </MenuItem>
      <SupportButton>Change CTR</SupportButton>

      <SupportButton>
        <HeadsetMicIcon />
        SUPPORT
      </SupportButton>
      <ClpCtrDialog open={open} handleCloseCTR={handleCloseCTR} />
    </Menu>
  );

  const [selectedIndex2, setSelectedIndex2] = React.useState(1);
  const [anchorE2, setAnchorE2] = React.useState(null);
  const handleClickListItem2 = (event) => {
    setAnchorE2(event.currentTarget);
  };

  const handleClose2 = () => {
    setAnchorE2(null);
  };
  const handleMenuItemClick2 = async (event, index) => {
    setNotification(notification.filter((data) => data.id != index));
    try {
      const resp = await removeNotification(index);
      console.log(resp);
    } catch (err) {
      console.log(err.message);
    }
    console.log(index);
  };

  return (
    <div className={classes.grow}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="open drawer"
            onClick={toggleDrawer("left", true)}
          >
            <MenuIcon />
          </IconButton>
          <Link to="/menu">
            <img src={logo} alt="logo" width="128px" />
          </Link>
          <Typography className={classes.title} variant="h6" noWrap>
            Checking
          </Typography>
          <div className={classes.grow} />
          <div className={classes.sectionDesktop}>
            {/* <IconButton aria-label="show 4 new mails" color="inherit">
              <Badge badgeContent={4} color="secondary">
                <MailIcon />
              </Badge>
            </IconButton> */}
            <IconButton aria-label="show 17 new notifications" color="inherit">
              <Badge badgeContent={notification.length} color="secondary">
                <NotificationsIcon
                  onClick={handleClickListItem2}
                  style={{ cursor: "pointer" }}
                />
              </Badge>
            </IconButton>
            <IconButton
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
            <SupportButton onClick={handleClickOpenCTR}>
              Change CTR
            </SupportButton>

            <SupportButton>
              <HeadsetMicIcon />
              SUPPORT
            </SupportButton>
          </div>
          <div className={classes.sectionMobile}>
            <IconButton
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
      <Drawer
        anchor={"left"}
        open={state["left"]}
        onClose={toggleDrawer("left", false)}
      >
        {list("left")}
      </Drawer>
      {renderMobileMenu}
      {renderMenu}
      <Menu
        id="lock-menu1"
        anchorEl={anchorE2}
        keepMounted
        open={Boolean(anchorE2)}
        onClose={handleClose2}
      >
        {notification.map((option, index) => (
          <MenuItem
            key={index}
            selected={index === selectedIndex2}
            onClick={(event) => handleMenuItemClick2(event, option.id)}
            style={{ backgroundColor: "#FFCBE4" }}
          >
            {option.text}
          </MenuItem>
        ))}
      </Menu>
      <ClpCtrDialog open={open} handleCloseCTR={handleCloseCTR} />
      <ProfileBox
        openProfile={openProfile}
        handleClickOpenProfile={handleClickOpenProfile}
        handleCloseProfile={handleCloseProfile}
      />
    </div>
  );
}
