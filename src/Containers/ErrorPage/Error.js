import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

class Error extends Component {
  render() {
    if (!this.props.error) {
      return <Redirect to="/" />;
    }

    return <h1 style={{ textAlign: 'center' }}>ERROR 404: NOT FOUND</h1>;
  }
}

const mapStateToProps = (state) => {
  return {
    error: state.movies.error,
  };
};

export default connect(mapStateToProps)(Error);
