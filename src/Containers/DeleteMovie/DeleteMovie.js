import React, { Component, Fragment } from 'react';
import classes from './DeleteMovie.module.css';

import { connect } from 'react-redux';
import Dropdown from '../../Components/UI/Dropdown/Dropdown';
import * as actions from '../../store/actions/index';
import { Redirect } from 'react-router-dom';

class DeleteMovie extends Component {
  state = {
    drop: false,
  };

  dropdownHandler = () => {
    this.setState((prevState) => {
      return { drop: !prevState.drop };
    });
  };

  componentDidMount() {
    this.props.onFetchMovies();
  }

  componentWillUnmount() {
    this.props.onDeleteMovieInit();
  }

  render() {
    let style = [classes.DropMenu];
    let redirect = null;

    if (this.state.drop) {
      style.push(classes.Show);
    }

    if (this.props.deleted) {
      redirect = <Redirect to="/" />;
    }

    return (
      <Fragment>
        {redirect}
        <main className={classes.DeleteMovie}>
          <div className={classes.Container}>
            <h1>Select a movie to delete</h1>
            <Dropdown
              class={classes.Dropdown}
              dropBtn={classes.DropBtn}
              clicked={this.dropdownHandler}
              dropMenu={style.join(' ')}
              listBtn={classes.ListBtn}
              dropTitle
              movies={this.props.movies}
              dropClick={(params) => {
                this.props.onDeleteMovie(params);
              }}
            />
          </div>
        </main>
      </Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    movies: state.movies.movies,
    deleted: state.movies.deleted,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onFetchMovies: (genre) => {
      return dispatch(actions.fetchMovies(genre));
    },
    onDeleteMovie: (params) => {
      return dispatch(actions.deleteMovie(params));
    },
    onDeleteMovieInit: () => {
      return dispatch(actions.deleteMovieInit());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DeleteMovie);
