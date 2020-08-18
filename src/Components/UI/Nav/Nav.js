import React from 'react';
import classes from './Nav.module.css';
import { Link } from 'react-router-dom';

const nav = () => {
  return (
    <nav className={classes.Nav}>
      <ul>
        <li>
          <Link to="/">HOME</Link>
        </li>
        <li>
          <Link to="/addmovie">ADD MOVIE</Link>
        </li>
        <li>
          <Link to="/deletemovie">DELETE MOVIE</Link>
        </li>
      </ul>
    </nav>
  );
};

export default nav;
