const form = document.querySelector('form#form');
if (!form) throw new Error('Form #form não encontrado');
const message = document.createElement('p');

form.addEventListener('submit', async (event) => {
  event.preventDefault();

  const userData = {
    name: document.querySelector('input#name').value.trim(),
    password: document.querySelector('input#password').value.trim()
  };
  

  function animateError(containerSelector) {
  const el = document.querySelector(containerSelector);
  el.classList.add('input-error');
  setTimeout(() => el.classList.remove('input-error'), 400);
  }

  if (!userData.name) {
    animateError('.namec');
    return;
  }
  if (!userData.password) {
    animateError('.passc');
    return;
  }

  try {
    const URL = 'http://localhost:5000/users';
    const resp = await fetch(URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userData)
    });

    if (!resp.ok) throw new Error('Erro ao adicionar o usuário');

    const data = await resp.json();
    console.log(`User ${userData.name} adicionado com sucesso`, data);
  } catch (error) {
    console.error('Erro', error);
  }
});