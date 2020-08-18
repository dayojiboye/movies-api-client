import React, { Component, Fragment } from 'react';
import classes from './NewMovie.module.css';
import { connect } from 'react-redux';

import Input from '../../Components/UI/Input/Input';
import * as actions from '../../store/actions/index';
import { Redirect } from 'react-router-dom';

class NewMovie extends Component {
  state = {
    movie: {
      name: {
        label: 'Name',
        elType: 'input',
        config: {
          type: 'text',
          name: 'name',
          id: 'name',
          placeholder: 'Name of movie',
        },
        rules: {
          required: true,
          emptyTextError: 'Enter movie name!',
        },
        value: '',
        validity: true,
      },
      duration: {
        label: 'Duration',
        elType: 'input',
        config: {
          type: 'text',
          name: 'duration',
          id: 'duration',
          placeholder: 'e.g 1h 1m',
        },
        rules: {
          required: true,
          emptyTextError: 'Enter movie duration!',
        },
        value: '',
        validity: true,
      },
      genre: {
        label: 'Genre',
        elType: 'select',
        config: {
          name: 'genre',
          id: 'genre',
          options: [
            { value: '', displayValue: 'Select a movie genre' },
            { value: 'action', displayValue: 'Action' },
            { value: 'horror', displayValue: 'Horror' },
            { value: 'sci-fi', displayValue: 'Sci-Fi' },
            { value: 'comedy', displayValue: 'Comedy' },
            { value: 'romance', displayValue: 'Romance' },
          ],
        },
        rules: {
          required: true,
          emptyTextError: 'Select a genre!',
        },
        value: '',
        validity: true,
      },
      imgUrl: {
        // this could be a file input
        label: 'Image URL',
        elType: 'input',
        config: {
          type: 'text',
          name: 'image',
          id: 'image',
          placeholder: 'Enter image url',
        },
        rules: {
          required: true,
          emptyTextError: 'Upload image url for movie!',
        },
        value: '',
        validity: true,
      },
      desc: {
        label: 'Description',
        elType: 'textarea',
        config: {
          name: 'desc',
          id: 'desc',
          placeholder: 'Some descriptions about the movie',
          rows: '4',
          cols: '20',
        },
        rules: {
          required: true,
          emptyTextError: 'Enter movie description!',
        },
        value: '',
        validity: true,
      },
      year: {
        label: 'Year of release',
        elType: 'input',
        config: {
          type: 'text',
          name: 'year',
          id: 'year',
          placeholder: 'e.g 2000',
        },
        rules: {
          required: true,
          emptyTextError: 'Enter movie release year!',
        },
        value: '',
        validity: true,
      },
    },
    formValidity: false,
  };

  checkValidity = (rules, value) => {
    let invalidEl = true;

    if (rules.required) {
      invalidEl = value.trim() !== '' && invalidEl;
    }

    return invalidEl;
  };

  inputHandler = (id, event) => {
    const updatedForm = { ...this.state.movie };
    const updatedFormElement = { ...updatedForm[id] };
    updatedFormElement.value = event.target.value;
    updatedFormElement.validity = this.checkValidity(
      updatedFormElement.rules,
      updatedFormElement.value
    );
    updatedForm[id] = updatedFormElement;

    let formValidity = true;
    for (let keys in updatedForm) {
      formValidity =
        updatedForm[keys].validity &&
        updatedForm[keys].value.trim() !== '' &&
        formValidity;
    }

    this.setState({ movie: updatedForm, formValidity: formValidity });
  };

  formHandler = (event) => {
    event.preventDefault();
    let movie = {};

    for (let key in this.state.movie) {
      movie[key] = this.state.movie[key].value;
    }

    this.props.onAddMovie(movie);
  };

  componentWillUnmount() {
    this.props.onAddMovieInit();
  }

  render() {
    let formInput = [];
    let redirect = null;
    let btnText = 'Submit';

    for (let keys in this.state.movie) {
      formInput.push({ id: keys, config: this.state.movie[keys] });
    }

    if (this.props.added) {
      redirect = <Redirect to="/" />;
    }

    if (this.props.loading) {
      btnText = <i className="far fa-spinner fa-spin fa-lg"></i>;
    }

    return (
      <Fragment>
        {redirect}
        <main className={classes.NewMovie}>
          <form className={classes.Form} onSubmit={this.formHandler}>
            <header>
              <h2>New Movie</h2>
            </header>
            <div className={classes.InputGroup}>
              {formInput.map((input) => {
                return (
                  <Input
                    key={input.id}
                    class={classes.FormGroup}
                    labelClass={classes.Label}
                    label={input.config.label}
                    inputClass={classes.Input}
                    elType={input.config.elType}
                    elConfig={input.config.config}
                    value={input.config.value}
                    changed={this.inputHandler.bind(this, input.id)}
                    validity={input.config.validity}
                    invalid={classes.Invalid}
                    errorClass={classes.Error}
                    emptyInputErrorText={input.config.rules.emptyTextError}
                    required={input.config.rules.required}
                  />
                );
              })}
            </div>
            <div className={classes.FormFooter}>
              <button disabled={!this.state.formValidity}>{btnText}</button>
            </div>
          </form>
        </main>
      </Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    added: state.movies.added,
    loading: state.movies.loading,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onAddMovie: (movie) => {
      return dispatch(actions.addMovie(movie));
    },
    onAddMovieInit: () => {
      return dispatch(actions.addMovieInit());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(NewMovie);
