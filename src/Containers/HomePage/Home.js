import React, { Component, Fragment } from 'react';
import classes from './Home.module.css';
import { connect } from 'react-redux';

import Dropdown from '../../Components/UI/Dropdown/Dropdown';
import Movies from './MoviesList/movies';
import * as actions from '../../store/actions/index';
import Spinner from '../../Components/UI/Spinner/Spinner';

class HomePage extends Component {
  state = {
    drop: false,
    searchText: '',
  };

  dropdownHandler = () => {
    this.setState((prevState) => {
      return { drop: !prevState.drop };
    });
  };

  searchInputHandler = (event) => {
    this.setState({ searchText: event.target.value });
  };

  searchInputFocus = () => {
    this.setState({ drop: false });
  };

  componentDidMount() {
    this.props.onFetchMovies();
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.searchText !== prevState.searchText) {
      const moviesList = this.listElement.querySelectorAll('li');
      const searchText = new RegExp(`${this.state.searchText.trim()}`, 'i');

      for (const movie of moviesList) {
        if (!searchText.test(movie.querySelector('h3').textContent)) {
          movie.classList.add(classes.Hide);
        } else {
          movie.classList.remove(classes.Hide);
        }
      }
    }

    if (this.props.movies !== prevProps.movies) {
      this.setState({ drop: false, searchText: '' });
    }
  }

  render() {
    let style = [classes.DropMenu];
    let movies = (
      <Movies
        movies={this.props.movies}
        searchText={this.state.searchText}
        listRef={(el) => {
          return (this.listElement = el);
        }}
      />
    );

    if (this.props.loading) {
      movies = <Spinner />;
    }

    if (this.state.drop) {
      style.push(classes.Show);
    }

    return (
      <Fragment>
        <main className={classes.Home}>
          <div className={classes.HomeDialogue}>
            <Dropdown
              class={classes.Dropdown}
              dropBtn={classes.DropBtn}
              dropMenu={style.join(' ')}
              listBtn={classes.ListBtn}
              movies={this.props.movies}
              clicked={this.dropdownHandler}
              genre={this.props.genre}
              dropClick={(params) => {
                return this.props.onFetchMovies(params);
              }}
            />
            <input
              type="text"
              placeholder="Search Movies"
              onChange={this.searchInputHandler}
              value={this.state.searchText}
              onFocus={this.searchInputFocus}
            />
          </div>
          {movies}
        </main>
      </Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    movies: state.movies.movies,
    loading: state.movies.loading,
    genre: state.movies.genre,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onFetchMovies: (params) => {
      return dispatch(actions.fetchMovies(params));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
