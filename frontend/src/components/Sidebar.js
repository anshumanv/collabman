import React, { Component } from 'react';
import { connect } from 'react-redux';

import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import PropTypes from 'prop-types';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import DraftsIcon from '@material-ui/icons/Drafts';
import StarIcon from '@material-ui/icons/Star';
import SendIcon from '@material-ui/icons/Send';
import MailIcon from '@material-ui/icons/Mail';
import DeleteIcon from '@material-ui/icons/Delete';
import ReportIcon from '@material-ui/icons/Report';
import BluetoothIcon from '@material-ui/icons/Bluetooth';
import Divider from '@material-ui/core/Divider';
import { withStyles } from '@material-ui/core/styles';

// Sample data, use api to fethc stuff
import { mailFolderListItems, otherMailFolderListItems } from './tileData';

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
    console.log(projectsData);
    return (
      <Drawer
        variant="permanent"
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.toolbar} />
        <div className={classes.drawerSection}>My Projects</div>
        {projectsData && (
          <List>
            <div>
              {projectsData.map(project => (
                <ListItem button key={project.project_name}>
                  <ListItemIcon>
                    <InboxIcon />
                  </ListItemIcon>
                  <ListItemText primary={project.project_name} />
                </ListItem>
              ))}
            </div>
          </List>
        )}
        <Divider />
        <div className={classes.drawerSection}>Collaborating on</div>
        {projectsData && (
          <List>
            <div>
              {projectsData.map(project => (
                <ListItem button key={project.project_name}>
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
};

const mapStateToProps = state => {
  return {
    projects: state.projects.userProjects,
  };
};

const mapDispatchToProps = dispatch => {
  return {};
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withStyles(styles)(Sidebar));
