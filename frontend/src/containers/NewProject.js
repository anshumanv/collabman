import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import NewProjectForm from '../components/NewProjectForm';

const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
    height: '100vh',
    width: '100vw',
    justifyContent: 'center',
    alignItems: 'center',
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
        <NewProjectForm />
      </div>
    );
  }
}

export default withStyles(styles)(NewProject);
