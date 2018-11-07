import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import swal from 'sweetalert';

import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import deepOrange from '@material-ui/core/colors/deepOrange';
import ListSubheader from '@material-ui/core/ListSubheader';
import List from '@material-ui/core/List';
import TextField from '@material-ui/core/TextField';
import ListItem from '@material-ui/core/ListItem';
import AddIcon from '@material-ui/icons/Add';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Collapse from '@material-ui/core/Collapse';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import DraftsIcon from '@material-ui/icons/Drafts';
import SendIcon from '@material-ui/icons/Send';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import StarBorder from '@material-ui/icons/StarBorder';
import Typography from '@material-ui/core/Typography';

// Actions
import {
  fetchTasks,
  postNewTask,
  deleteSelectedTask,
} from '../actions/taskActions';

// Some icons :)
import { IoIosList } from 'react-icons/io';

const styles = theme => ({
  root: {
    width: '100%',
    backgroundColor: theme.palette.background.paper,
  },
  nested: {
    paddingLeft: theme.spacing.unit * 4,
  },
  card: {
    minWidth: 275,
    marginTop: '20px',
  },
  title: {
    marginBottom: 16,
    fontSize: 22,
    display: 'flex',
    alignItems: 'center',
  },
});

class TasksCard extends Component {
  state = {
    open: false,
    taskTitle: '',
    taskDescription: '',
  };

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  handleFormUpdates = (event, input) => {
    if (event.target.id === 'task-title')
      this.setState({ [input]: event.target.value });
    else if (event.target.id === 'task-content')
      this.setState({ [input]: event.target.value });
  };

  submitNewTask = event => {
    event.preventDefault(); // good
    const newTaskPayload = {
      task_title: this.state.taskTitle,
      task_description: this.state.taskDescription,
    };
    console.log(newTaskPayload);
    this.props.submitTask(newTaskPayload);
    this.handleClose();
  };

  deleteTaskConfirmation = taskId => {
    swal({
      title: 'Are you sure?',
      text: 'Once deleted, you will not be able to recover this!',
      icon: 'warning',
      buttons: true,
      dangerMode: true,
    }).then(willDelete => {
      if (willDelete) {
        this.props.deleteTask(taskId);
        swal('Poof! Task has been deleted!', {
          icon: 'success',
        });
      }
    });
  };

  render() {
    const { classes, tasks, currentProject, profile } = this.props;
    const bull = <span className={classes.bullet}>•</span>;
    let tasksList = [];
    if (tasks) {
      tasksList = tasks.tasks;
    }

    return (
      <Card className={classes.card}>
        <CardContent>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <Typography className={classes.title} color="textSecondary">
              <IoIosList size="2em" style={{ marginRight: '10px' }} />
              Tasks
            </Typography>
            <Button
              variant="fab"
              mini
              color="primary"
              aria-label="Add"
              className={classes.button}
              onClick={this.handleClickOpen}
            >
              <AddIcon />
            </Button>
          </div>
          <div className={classes.root}>
            {tasksList.length ? (
              <List component="nav">
                {tasksList.map(task => (
                  <ListItem key={task.id} button>
                    <ListItemIcon>
                      <SendIcon />
                    </ListItemIcon>
                    <ListItemText
                      inset
                      primary={task.task_title}
                      secondary={task.task_description}
                    />
                    {currentProject &&
                      profile &&
                      (currentProject.project_manager === profile.id ? (
                        <ListItemSecondaryAction>
                          <IconButton
                            aria-label="Delete"
                            onClick={() =>
                              this.deleteTaskConfirmation(task.task_id)
                            }
                          >
                            <DeleteIcon />
                          </IconButton>
                        </ListItemSecondaryAction>
                      ) : (
                        ''
                      ))}
                  </ListItem>
                ))}
              </List>
            ) : (
              <div style={{ fontSize: '0.8em' }}>Nothing here \ (•◡•) /</div>
            )}
          </div>
        </CardContent>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">New Task</DialogTitle>
          <DialogContent>
            <DialogContentText>Please enter the task details</DialogContentText>
            <form onSubmit={this.submitNewTask}>
              <TextField
                multiline
                autoFocus
                margin="dense"
                required
                id="task-title"
                onChange={e => this.handleFormUpdates(e, 'taskTitle')}
                label="Task Title"
                type="text"
                fullWidth
              />
              <TextField
                required
                multiline
                margin="dense"
                id="task-content"
                onChange={e => this.handleFormUpdates(e, 'taskDescription')}
                label="Task Content"
                type="text"
                fullWidth
              />
              <Button onClick={this.handleClose} color="primary">
                Cancel
              </Button>
              <Button type="submit" color="primary">
                Submit
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </Card>
    );
  }
}

TasksCard.propTypes = {
  classes: PropTypes.object.isRequired,
  fetchProjectTasks: PropTypes.func,
  tasks: PropTypes.object,
  submitTask: PropTypes.func,
  deleteTask: PropTypes.func,
  currentProject: PropTypes.obj,
  profile: PropTypes.obj,
};

const mapStateToProps = state => {
  return {
    tasks: state.tasks,
    currentProject: state.projects.currentProject,
    profile: state.auth.profile,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchProjectTasks: () => {
      return dispatch(fetchTasks());
    },
    submitTask: payload => {
      return dispatch(postNewTask(payload));
    },
    deleteTask: taskId => {
      return dispatch(deleteSelectedTask(taskId));
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withStyles(styles)(TasksCard));
