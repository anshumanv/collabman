import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Switch from '@material-ui/core/Switch';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormGroup from '@material-ui/core/FormGroup';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import Input from '@material-ui/core/Input';
import Button from '@material-ui/core/Button';
import CalendarToday from '@material-ui/icons/CalendarToday';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';

var meeting = {
  summary: 'Meeting # here',
  location: 'Enter location',
  description: 'One line description',
  start: {
    dateTime: '2018-10-24T09:00:00+05:30',
    timeZone: 'Asia/Kolkata',
  },
  end: {
    dateTime: '2018-10-24T17:00:00+05:30',
    timeZone: 'Asia/Kolkata',
  },
  attendees: [{ email: '201651062@iiitvadodara.ac.in' }],
  reminders: {
    useDefault: false,
    overrides: [
      { method: 'email', minutes: 24 * 60 },
      { method: 'popup', minutes: 10 },
    ],
  },
};

const styles = theme => ({
  root: {
    flexGrow: 1,
    maxWidth: '100vw',
    height: '100vh',
    overflow: 'hidden',
  },
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
  container: {
    display: 'flex',
    flexWrap: 'wrap',
    height: '100vh',
    width: '100vw',
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    margin: theme.spacing.unit,
    marginTop: '10px',
  },
  form: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
  },
  textField: {
    width: '60vw',
    maxWidth: '500px',
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
  },
  button: {
    marginTop: '20px',
  },
});

class MeetingScheduler extends Component {
  state = {
    auth: true,
    anchorEl: null,
  };

  handleMenu = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
    window.location = '/project/<id>';
  };

  render() {
    const { classes } = this.props;
    const { auth, anchorEl } = this.state;
    const open = Boolean(anchorEl);

    return (
      <div className={classes.root}>
        <AppBar position="static">
          <Toolbar>
            <Typography
              variant="title"
              color="inherit"
              className={classes.grow}
            >
              collabman
            </Typography>
            {auth && (
              <div>
                <IconButton
                  aria-owns={open ? 'menu-appbar' : null}
                  aria-haspopup="true"
                  onClick={this.handleMenu}
                  color="inherit"
                >
                  <AccountCircle />
                </IconButton>
                <Menu
                  id="menu-appbar"
                  anchorEl={anchorEl}
                  anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  open={open}
                  onClose={this.handleClose}
                >
                  <MenuItem onClick={this.handleClose}>Projects</MenuItem>
                  <MenuItem onClick={this.switchToHomeScreen}>Logout</MenuItem>
                </Menu>
              </div>
            )}
          </Toolbar>
        </AppBar>

        <div className={classes.container}>
          <form action="" className={classes.form}>
            <Typography variant="headline" component="h2">
              Schedule Meeting
            </Typography>
            <TextField
              id="outlined-with-placeholder"
              label="Meeting Number"
              placeholder="Meeting Number"
              className={classes.textField}
              margin="normal"
              variant="outlined"
            />
            <TextField
              id="outlined-with-placeholder"
              label="Purpose"
              placeholder="Purpose for scheduling"
              className={classes.textField}
              margin="normal"
              variant="outlined"
            />
            <TextField
              id="outlined-with-placeholder"
              label="Meeting Date"
              placeholder="dd-mm-yyyy"
              className={classes.textField}
              margin="normal"
              variant="outlined"
            />
            <TextField
              id="outlined-with-placeholder"
              label="Meeting Time"
              placeholder="hh:mm"
              className={classes.textField}
              margin="normal"
              variant="outlined"
            />
            <Button
              variant="fab"
              color="primary"
              aria-label="Add"
              className={classes.button}
            >
              <CalendarToday />
            </Button>
          </form>
        </div>
      </div>
    );
  }
}

MeetingScheduler.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(MeetingScheduler);
