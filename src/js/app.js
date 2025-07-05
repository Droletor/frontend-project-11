import '../scss/styles.scss';
import 'bootstrap';
import * as yup from 'yup';
import onChange from 'on-change';
import render from './render.js';

const app = () => {
  const state = {
    formState: 'filling',
    inputValue: '',
  };

  const elements = {
    form: document.querySelector('form'),
    input: document.querySelector('#url-input'),
    submit: document.querySelector('[type="submit"]'),
    feedback: document.querySelector('.feedback'),
    feeds: document.querySelector('.feeds'),
    posts: document.querySelector('.posts'),
    modalHeader: document.querySelector('.modal-header'),
    modalBody: document.querySelector('.modal-body'),
    modalButtons: document.querySelectorAll('.btn-outline-primary'),
  };

  const watchedState = onChange(state, (path) => render(path, state, elements));

  const validateURL = (url, existingLinks) => {
    const schema = yup.string().required().url().notOneOf(existingLinks);

    return schema
      .validate(url)
      .then(() => null)
      .catch((error) => error);
  };

  elements.form.addEventListener('submit', (e) => {
    e.preventDefault();

    watchedState.formState = 'filling';
    const formData = new FormData(e.target);
    const url = formData.get('url');
    watchedState.inputValue = url;

    validateURL(url, [])
      .then((error) => {
        if (error) {
          watchedState.error = error;
          watchedState.formState = 'invalid';
          throw new Error(error);
        } else {
          watchedState.error = null;
          return url;
        }
      })
      .then(() => {
        watchedState.formState = 'sending';
      });
  });
};

app();
