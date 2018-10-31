import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

// Components
import Contributions from '../components/Contributions';
import TeamCard from '../components/Team';
import Tasks from '../components/Tasks';
import NewProject from './NewProject';
import DocumentsCard from '../components/Documents';
import Sidebar from '../components/Sidebar.js';
import ChatWindow from '../components/Chat.js';

// MUI :(
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';

// Actions
import { getUserProjects } from '../actions/projectActions';
import { fetchContributors } from '../actions/statsActions';
import { authSuccess } from '../actions/authActions';

const drawerWidth = 240;

const styles = theme => ({
  root: {
    flexGrow: 1,
    height: '100vh',
    zIndex: 1,
    overflow: 'hidden',
    position: 'relative',
    display: 'flex',
  },
  grow: {
    flexGrow: 1,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    backgroundColor: '#162630',
  },
  drawerPaper: {
    position: 'relative',
    width: drawerWidth,
  },
  content: {
    overflowY: 'scroll',
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing.unit * 3,
    minWidth: 0, // So the Typography noWrap works
  },
  toolbar: theme.mixins.toolbar,
});

class Dashboard extends Component {
  state = {
    auth: true,
    anchorEl: null,
  };

  componentDidMount() {
    if (localStorage.getItem('access_token')) {
      this.props.saveAuth(
        localStorage.getItem('access_token'),
        localStorage.getItem('username'),
      );
    }
    this.props.getUserProjects();
    this.props.fetchContributors();
  }

  handleChange = event => {
    this.setState({ auth: event.target.checked });
  };

  handleMenu = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
    window.location = '/profile/<username>';
  };

  render() {
    const { classes } = this.props;
    const { auth, anchorEl } = this.state;
    const open = Boolean(anchorEl);

    return (
      <div className={classes.root}>
        <AppBar position="absolute" className={classes.appBar}>
          <Toolbar>
            <Typography
              className={classes.grow}
              variant="title"
              color="inherit"
              noWrap
            >
              {this.props.currentProject
                ? this.props.currentProject.project_name
                : ''}
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
                  <MenuItem onClick={this.handleClose}>Profile</MenuItem>
                  <MenuItem onClick={this.handleClose}>Logout</MenuItem>
                </Menu>
              </div>
            )}
          </Toolbar>
        </AppBar>

        <Sidebar />

        <main className={classes.content}>
          <div className={classes.toolbar} />
          <Typography noWrap>{'Welcome to collabman!'}</Typography>

          <Contributions />

          <TeamCard />

          <Tasks />

          <DocumentsCard />

          <ChatWindow />
        </main>
      </div>
    );
  }
}

Dashboard.propTypes = {
  classes: PropTypes.object.isRequired,
  getUserProjects: PropTypes.func,
  fetchContributors: PropTypes.func,
  currentProject: PropTypes.object,
  saveAuth: PropTypes.func,
};

const mapStateToProps = state => {
  return {
    currentProject: state.projects.currentProject,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getUserProjects: userId => {
      return dispatch(getUserProjects(userId));
    },
    fetchContributors: project => {
      return dispatch(fetchContributors(project));
    },
    saveAuth: (token, username) => {
      dispatch(authSuccess(token, username));
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withStyles(styles)(Dashboard));
