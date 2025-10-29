const submitButton = document.querySelector('button.submit');
const nameInput = document.querySelector('input#name');
const passwordInput = document.querySelector('input#password');

function minRequired(input, conteinerClass) {
  input.addEventListener('keydown', () => {
    if(input.value.length <= 1) {
      document.querySelector(`${conteinerClass}`).style.outline = '1px solid rgba(221, 14, 14, 0.623)';
      return 0;
    } else {
      document.querySelector(`${conteinerClass}`).style.outline = 'none';
      return 1;
    }
  })
}

minRequired(nameInput, 'div.namec');
minRequired(passwordInput, 'div.passc');