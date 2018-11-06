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
import CircularProgress from '@material-ui/core/CircularProgress';

// Acitons
import { fetchUserProfile } from '../actions/profileActions';
import { authSuccess } from '../actions/authActions';

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
  componentDidMount() {
    if (localStorage.getItem('access_token')) {
      this.props.saveAuth(
        localStorage.getItem('access_token'),
        localStorage.getItem('username'),
      );
    }
    this.props.fetchProfile();
  }

  render() {
    const { classes, auth } = this.props;
    const { profile } = auth;
    return (
      <div className={classes.root}>
        <div className="profile-description">
          <Paper className={classes.paper} elevation={1}>
            {profile.user ? (
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
                        src={
                          auth.username
                            ? `https://avatars.githubusercontent.com/${
                                auth.username
                              }`
                            : ''
                        }
                        className={classNames(classes.bigAvatar)}
                      />
                    </Grid>
                    <Grid item style={{ paddingTop: '30px' }}>
                      <Typography
                        variant="h3"
                        component="h3"
                        style={{ fontSize: '19px' }}
                      >
                        {`User ID - ${profile.id}`}
                      </Typography>
                    </Grid>
                    <Grid item style={{ paddingTop: '10px' }}>
                      <Typography
                        variant="title"
                        component="h1"
                        style={{ fontSize: '28px' }}
                      >
                        {`${profile.user.first_name} ${profile.user.last_name}`}
                      </Typography>
                    </Grid>
                    <Grid item style={{ paddingTop: '10px' }}>
                      <Typography
                        variant="h3"
                        component="h3"
                        style={{ fontSize: '19px' }}
                      >
                        {profile.user.email}
                      </Typography>
                    </Grid>
                    <Grid item style={{ paddingTop: '10px' }}>
                      <Typography
                        variant="h3"
                        component="h3"
                        style={{ fontSize: '19px' }}
                      >
                        {profile.bio}
                      </Typography>
                    </Grid>
                    <Grid item style={{ paddingTop: '10px' }}>
                      <AccountCircle />
                      <AccessAlarmIcon />
                      <HomeIcon />
                    </Grid>
                  </Grid>
                </div>
              </React.Fragment>
            ) : (
              <div className={classes.allCenter}>
                <CircularProgress />
              </div>
            )}
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
  saveAuth: PropTypes.func,
  profile: PropTypes.obj,
  auth: PropTypes.obj,
};

const mapStateToProps = state => {
  return {
    auth: state.auth,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchProfile: () => {
      dispatch(fetchUserProfile());
    },
    saveAuth: (token, username) => {
      dispatch(authSuccess(token, username));
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withStyles(styles)(Profile));
