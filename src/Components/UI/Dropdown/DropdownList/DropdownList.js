import React from 'react';

const list = (props) => {
  const moviesGenre = ['all', 'action', 'horror', 'sci-fi', 'comedy', 'romance'];

  let droplist = moviesGenre.map((genre) => {
    return (
      <li key={genre}>
        <button
          className={props.listBtn}
          onClick={props.dropClick.bind(this, genre)}
        >
          {genre}
        </button>
      </li>
    );
  });

  if (props.dropTitle) {
    droplist = props.movies.map((movie) => {
      return (
        <li key={movie.name}>
          <button
            className={props.listBtn}
            onClick={props.dropClick.bind(this, movie.name)}
          >
            {movie.name}
          </button>
        </li>
      );
    });
  }

  return droplist;
};

export default list;
