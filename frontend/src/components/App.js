import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';

const styles = theme => ({
  root: {
    height: '100vh',
    width: '100vw',
    backgroundColor: '#162630',
    color: 'white',
    display: 'flex',
    flexDirection: 'column',
  },
  heading: {
    fontFamily: 'K2D, sans-serif',
    color: '#00af5b',
    fontSize: '10vw',
  },
  allCenter: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: 'fit-content',
    alignSelf: 'center',
  },
  tagline: {
    fontFamily: 'K2D, sans-serif',
    fontSize: '5vw',
  },
  button: {
    backgroundColor: '#00af5b',
    color: 'white',
    marginLeft: '20px',
  },
  buttonContainer: {
    display: 'flex',
    justifyContent: 'flex-end',
    marginRight: '20px',
    marginTop: '20px',
  },
});

class App extends Component {
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <div className={classes.buttonContainer}>
          <Button variant="contained" className={classes.button}>
            Login
          </Button>
          <Button variant="contained" className={classes.button}>
            Signup
          </Button>
        </div>
        <div className={classes.allCenter}>
          <div className={classes.heading}>collabman</div>
        </div>
        <div className={classes.allCenter}>
          <div>Elegant collaboration management</div>
        </div>
      </div>
    );
  }
}

App.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(App);
