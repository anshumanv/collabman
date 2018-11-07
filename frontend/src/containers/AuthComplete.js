import React from 'react';
import PropTypes from 'prop-types';
import { authSuccess } from '../actions/authActions';
import { connect } from 'react-redux';

import { API_URL } from '../constants';

import axios from 'axios';

const styles = theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
});

class AuthComplete extends React.Component {
  componentDidMount() {
    axios
      .get(`${API_URL}/api/v1/github_token/`)
      .then(res => {
        console.log(res.data);
        localStorage.setItem('access_token', res.data.token[0]);
        localStorage.setItem('username', res.data.username);
        this.props.saveAuth(res.data.token[0], res.data.username);
        this.props.history.push('/dashboard');
      })
      .catch(err => {
        console.log(err);
      });
  }

  render() {
    return <div>Redirecting</div>;
  }
}

AuthComplete.propTypes = {
  saveAuth: PropTypes.func,
  history: PropTypes.func,
};

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
)(AuthComplete);
