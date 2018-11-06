import React, { Component } from 'react';
import { connect } from 'react-redux';

import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import Button from '@material-ui/core/Button';
import DraftsIcon from '@material-ui/icons/Drafts';
import StarIcon from '@material-ui/icons/Star';
import SendIcon from '@material-ui/icons/Send';
import MailIcon from '@material-ui/icons/Mail';
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';
import ReportIcon from '@material-ui/icons/Report';
import BluetoothIcon from '@material-ui/icons/Bluetooth';
import Divider from '@material-ui/core/Divider';
import { withStyles } from '@material-ui/core/styles';

//Actions
import { setCurrentProject } from '../actions/projectActions';

const drawerWidth = 240;

const styles = theme => ({
  drawerPaper: {
    position: 'relative',
    width: drawerWidth,
  },
  drawerSection: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: '10px',
  },
  toolbar: theme.mixins.toolbar,
  newButton: {
    margin: '20px',
  },
});

class Sidebar extends Component {
  render() {
    const { classes } = this.props;
    let projectsData = [];
    if (this.props.projects) {
      this.props.projects.map(project => {
        projectsData.push(project);
      });
    }
    return (
      <Drawer
        variant="permanent"
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.toolbar} />
        <Link to="/new">
          <Button
            className={classes.newButton}
            variant="outlined"
            color="primary"
            aria-label="Delete"
          >
            <AddIcon />
            New Project
          </Button>
        </Link>
        <div className={classes.drawerSection}>Projects</div>
        {projectsData && (
          <List>
            <div>
              {projectsData.map(project => (
                <ListItem
                  button
                  key={project.id}
                  style={{
                    backgroundColor:
                      project.id ===
                      (this.props.currentProject
                        ? this.props.currentProject.id
                        : 0)
                        ? 'darkgray'
                        : '',
                  }}
                  onClick={() => this.props.switchProject(project)}
                >
                  <ListItemIcon>
                    <InboxIcon />
                  </ListItemIcon>
                  <ListItemText primary={project.project_name} />
                </ListItem>
              ))}
            </div>
          </List>
        )}
      </Drawer>
    );
  }
}

Sidebar.propTypes = {
  classes: PropTypes.object.isRequired,
  projects: PropTypes.array,
  currentProject: PropTypes.object,
  switchProject: PropTypes.func,
};

const mapStateToProps = state => {
  return {
    projects: state.projects.userProjects,
    currentProject: state.projects.currentProject,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    switchProject: project => {
      return dispatch(setCurrentProject(project));
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withStyles(styles)(Sidebar));
