import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import { GoMarkGithub } from 'react-icons/go';
import { API_URL } from '../constants';

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
    flexDirection: 'column',
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
  headingContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonContainer: {
    display: 'flex',
    justifyContent: 'flex-end',
    marginRight: '20px',
    marginTop: '20px',
  },
});

class App extends Component {
  componentDidMount() {
    if (localStorage.getItem('access_token')) {
      console.log(localStorage.getItem('access_token'));
      this.props.history.push('/dashboard');
    }
  }

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <div className={classes.buttonContainer}>
          <Button
            href={`${API_URL}/api/v1/auth/login/github/`}
            variant="contained"
            className={classes.button}
          >
            <GoMarkGithub style={{ marginRight: '5px' }} />
            Login
          </Button>
        </div>
        <div className={classes.allCenter} style={{ marginTop: '20vh' }}>
          <div className={classes.heading}>collabman</div>
          <div className={classes.allCenter}>
            Elegant collaboration management
          </div>
        </div>
      </div>
    );
  }
}

App.propTypes = {
  classes: PropTypes.object.isRequired,
  history: PropTypes.func,
};

export default withStyles(styles)(App);
