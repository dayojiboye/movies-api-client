import React from 'react';

import List from './DropdownList/DropdownList';

const dropdown = (props) => {
  let btnText = props.dropTitle ? 'Movies' : 'Genre';

  return (
    <div className={props.class}>
      <button className={props.dropBtn} onClick={props.clicked}>
        {btnText} <i className="fas fa-caret-down"></i>
      </button>
      <div className={props.dropMenu}>
        <ul>
          <List
            listBtn={props.listBtn}
            movies={props.movies}
            dropTitle={props.dropTitle}
            dropClick={(params) => {
              return props.dropClick(params);
            }}
          />
        </ul>
      </div>
    </div>
  );
};

export default dropdown;
