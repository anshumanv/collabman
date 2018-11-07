import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Snackbar from '@material-ui/core/Snackbar';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import { connect } from 'react-redux';

import { createNewProject } from '../actions/projectActions';

const styles = theme => ({
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

class NewProjectForm extends Component {
  state = {
    projectName: '',
    repoLink: '',
    projectMembers: '',
    showAlert: false,
  };
  static propTypes = {
    classes: PropTypes.object.isRequired,
    submitNewProject: PropTypes.func,
    errors: PropTypes.string,
    success: PropTypes.bool,
    history: PropTypes.func,
  };

  submitProject = e => {
    e.preventDefault();
    const payload = {
      project_name: this.state.projectName,
      project_link: this.state.repoLink,
      users: this.state.projectMembers.split(','),
    };
    console.log('submit called');
    this.props.submitNewProject(payload);
  };

  handleFormUpdates = (event, input) => {
    if (event.target.id === 'project-name')
      this.setState({ [input]: event.target.value });
    else if (event.target.id === 'project-repo')
      this.setState({ [input]: event.target.value });
    else if (event.target.id === 'project-members') {
      this.setState({ [input]: event.target.value });
    } else this.setState({ [input]: event.target.value });
  };

  render() {
    const { classes, errors, success } = this.props;
    const { showAlert } = this.state;
    if (success) {
      this.props.history.push('/dashboard');
    }
    return (
      <div>
        <form action="" className={classes.form} onSubmit={this.submitProject}>
          <Typography variant="headline" component="h2">
            New Project
          </Typography>
          <TextField
            id="project-name"
            label="Project Name"
            type="text"
            onChange={e => this.handleFormUpdates(e, 'projectName')}
            placeholder="Project Name"
            className={classes.textField}
            margin="normal"
            variant="outlined"
          />
          <TextField
            id="project-repo"
            label="Project Repository"
            type="text"
            placeholder="Project Repository"
            onChange={e => this.handleFormUpdates(e, 'repoLink')}
            className={classes.textField}
            margin="normal"
            variant="outlined"
          />
          <TextField
            id="project-members"
            label="Team Members"
            placeholder="Usernames (separated by comma)"
            type="text"
            className={classes.textField}
            onChange={e => this.handleFormUpdates(e, 'projectMembers')}
            margin="normal"
            variant="outlined"
          />
          <div>
            <Button
              variant="fab"
              type="submit"
              color="primary"
              aria-label="Add"
              className={classes.button}
            >
              <AddIcon />
            </Button>
          </div>
        </form>
        <Snackbar
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
          open={errors !== undefined}
          autoHideDuration={40}
        >
          <SnackbarContent
            variant="error"
            className={classes.margin}
            message={this.props.errors}
          />
        </Snackbar>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    errors: state.projects.creationError,
    success: state.projects.success,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    submitNewProject: payload => {
      return dispatch(createNewProject(payload));
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withStyles(styles)(NewProjectForm));
