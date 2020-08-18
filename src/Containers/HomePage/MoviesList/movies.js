import React from 'react';
import classes from './movies.module.css';

const movies = (props) => {
  let movies = props.movies.map((movie) => {
    return (
      <li key={movie.name}>
        <div className={classes.MovieImg}>
          <img src={movie.imgUrl} alt="movie img" />
        </div>
        <div className={classes.MovieInfo}>
          <h3>{movie.name}</h3>
          <p>{movie.duration}</p>
          <p className={classes.MovieGenre}>{movie.genre}</p>
          <p>{movie.desc}</p>
          <p>{movie.year}</p>
        </div>
      </li>
    );
  });

  return (
    <div className={classes.MoviesList}>
      <ul ref={props.listRef}>{movies}</ul>
    </div>
  );
};

export default movies;
