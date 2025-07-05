const renderInput = (state, elements) => {
  switch (state.formState) {
    case 'filling':
      elements.submit.disabled = false;
      elements.input.classList.remove('is-invalid');
      elements.feedback.textContent = '';
      elements.feedback.classList.remove('text-danger');
      elements.feedback.classList.remove('text-success');
      break;
    case 'valid':
      elements.submit.disabled = false;
      elements.input.value = '';
      elements.input.classList.remove('is-invalid');
      elements.feedback.classList.remove('text-danger');
      elements.feedback.classList.add('text-success');
      elements.feedback.textContent = 'status.success';
      break;
    case 'invalid':
      elements.submit.disabled = false;
      elements.input.value = state.inputValue;
      elements.input.classList.add('is-invalid');
      elements.feedback.textContent = 'state.error';
      elements.feedback.classList.remove('text-success');
      elements.feedback.classList.add('text-danger');
      break;
    case 'sending':
      elements.submit.disabled = true;
      elements.input.value = state.inputValue;
      elements.input.classList.remove('is-invalid');
      elements.feedback.textContent = '';
      elements.feedback.classList.remove('text-danger');
      elements.feedback.classList.remove('text-success');
      break;
    default:
      break;
  }
};

export default (path, state, elements) => {
  switch (path) {
    case 'formState':
      renderInput(state, elements);
      break;
    default:
      break;
  }
};
