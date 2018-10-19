import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';

const styles = theme => ({
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

class NewProject extends Component {
  static propTypes = {
    classes: PropTypes.object.isRequired,
  };

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.container}>
        <form action="" className={classes.form}>
          <Typography variant="headline" component="h2">
            New Project
          </Typography>
          <TextField
            id="outlined-with-placeholder"
            label="Project Name"
            placeholder="Project Name"
            className={classes.textField}
            margin="normal"
            variant="outlined"
          />
          <TextField
            id="outlined-with-placeholder"
            label="Project Repository"
            placeholder="Project Name"
            className={classes.textField}
            margin="normal"
            variant="outlined"
          />
          <TextField
            id="outlined-with-placeholder"
            label="Team Members"
            placeholder="Team Emails"
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
            <AddIcon />
          </Button>
        </form>
      </div>
    );
  }
}

export default withStyles(styles)(NewProject);
