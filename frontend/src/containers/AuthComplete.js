import React from 'react';
import PropTypes from 'prop-types';
import { authSuccess } from '../actions/authActions';
import { connect } from 'react-redux';

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
      .get('http://127.0.0.1:8000/api/v1/github_token/')
      .then(res => {
        console.log(res.data);
        this.props.saveAuth(res.data.token[0]);
        window.location.pathname = '/dashboard';
      })
      .catch(err => {
        console.log(err);
      });
  }

  render() {
    return <div>ahahah</div>;
  }
}

AuthComplete.propTypes = {
  saveAuth: PropTypes.func,
};

const mapStateToProps = state => {
  return {};
};

const mapDispatchToProps = dispatch => {
  return {
    saveAuth: token => {
      dispatch(authSuccess(token));
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AuthComplete);
