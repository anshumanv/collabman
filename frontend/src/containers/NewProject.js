import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { withStyles } from '@material-ui/core/styles';

import NewProjectForm from '../components/NewProjectForm';

import { authSuccess } from '../actions/authActions';

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
    saveAuth: PropTypes.func,
  };

  componentDidMount() {
    if (localStorage.getItem('access_token')) {
      this.props.saveAuth(
        localStorage.getItem('access_token'),
        localStorage.getItem('username'),
      );
    }
  }

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.container}>
        <NewProjectForm {...this.props} />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {};
};

const mapDispatchToProps = dispatch => {
  return {
    saveAuth: (token, username) => {
      dispatch(authSuccess(token, username));
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withStyles(styles)(NewProject));
