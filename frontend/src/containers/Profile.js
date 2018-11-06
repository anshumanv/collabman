import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

// MUI :(
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Switch from '@material-ui/core/Switch';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormGroup from '@material-ui/core/FormGroup';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import Paper from '@material-ui/core/Paper';
import classNames from 'classnames';
import Avatar from '@material-ui/core/Avatar';
import HomeIcon from '@material-ui/icons/Home';
import AccessAlarmIcon from '@material-ui/icons/AccessAlarm';
import Grid from '@material-ui/core/Grid';

// Acitons
import { fetchUserProfile } from '../actions/profileActions';

const styles = theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: '#aeaeae',
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
  paper: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
    width: '40vw',
    height: '100vh',
    textAlign: 'center',
  },
  bigAvatar: {
    backgroundColor: '#272727',
    width: 160,
    height: 160,
  },
});

class Profile extends Component {
  static propTypes = {};

  state = {
    auth: true,
    anchorEl: null,
  };

  componentDidMount() {
    this.props.fetchProfile();
  }

  handleMenu = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
    this.props.history.push('/dashboard');
  };

  switchToHomeScreen = () => {
    window.location = '/';
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
                  <MenuItem onClick={this.handleClose}>Dashboard</MenuItem>
                  <MenuItem onClick={this.switchToHomeScreen}>Logout</MenuItem>
                </Menu>
              </div>
            )}
          </Toolbar>
        </AppBar>

        <div className="profile-description">
          <Paper className={classes.paper} elevation={1}>
            <React.Fragment>
              <div className="profile-description">
                <Grid
                  container
                  direction="column"
                  justify="space-evenly"
                  alignItems="center"
                  style={{ paddingTop: '80px' }}
                >
                  <Grid item>
                    <Avatar
                      alt="Erlich B."
                      src=""
                      className={classNames(classes.bigAvatar)}
                    />
                  </Grid>
                  <Grid item style={{ paddingTop: '80px' }}>
                    <Typography
                      variant="title"
                      component="h1"
                      style={{ fontSize: '28px' }}
                    >
                      Erlich Bachman
                    </Typography>
                  </Grid>
                  <Grid item style={{ paddingTop: '40px' }}>
                    <Typography
                      variant="h3"
                      component="h3"
                      style={{ fontSize: '19px' }}
                    >
                      Startup Guru
                    </Typography>
                  </Grid>
                  <Grid item style={{ paddingTop: '60px' }}>
                    <Typography
                      variant="h3"
                      component="h3"
                      style={{ fontSize: '19px' }}
                    >
                      Profile Links
                    </Typography>
                  </Grid>
                  <Grid item style={{ paddingTop: '30px' }}>
                    <AccountCircle />
                    <AccessAlarmIcon />
                    <HomeIcon />
                  </Grid>
                </Grid>
              </div>
            </React.Fragment>
          </Paper>
        </div>
      </div>
    );
  }
}

Profile.propTypes = {
  classes: PropTypes.object.isRequired,
  history: PropTypes.obj,
  fetchProfile: PropTypes.func,
};

const mapStateToProps = state => {
  return {};
};

const mapDispatchToProps = dispatch => {
  return {
    fetchProfile: () => {
      dispatch(fetchUserProfile());
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withStyles(styles)(Profile));
