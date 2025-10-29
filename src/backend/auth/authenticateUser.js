import { getUsers } from "../../frontend/js/getUsers.js";

const form = document.querySelector('form#form');
const menssageContainer = document.querySelector('p.error-menssage');

if (!form) throw new Error('Form #form não encontrado');

form.addEventListener('submit', async (event) => {
  event.preventDefault();

  const userName = document.querySelector('input#name').value.trim();
  const password = document.querySelector('input#password').value.trim();


  menssageContainer.textContent = '';

  if (!userName || !password) {
    menssageContainer.textContent = 'Preencha todos os campos.';
    menssageContainer.style.color = 'red';
    return;
  }

  try {
    const response = await authenticateUser(userName, password);

    if (response.success) {
      window.open('src/frontend/ladingpage/index.html');
    } else {
      menssageContainer.textContent = response.message;
      menssageContainer.style.color = 'red';
    }

  } catch (error) {
    console.error('Erro no processo de autenticação:', error);
    menssageContainer.textContent = 'Erro de conexão com o servidor.';
    menssageContainer.style.color = 'red';
  }
});


async function authenticateUser(userName, password) {
  try {
    const users = await getUsers();

    if (!Array.isArray(users)) {
      return { success: false, message: 'Resposta inválida do servidor.' };
    }

    if (users.length === 0) {
      return { success: false, message: 'Nenhum usuário cadastrado.' };
    }

    const user = users.find(u => u.name === userName && u.password === password);

    if (user) {
      console.log(`Autenticado: ${user.name}`);
      return { success: true, message: `Bem-vindo, ${user.name}` };
    } else {
      return { success: false, message: 'Nome ou senha incorretos.' };
    }

  } catch (error) {
    console.error('Erro ao buscar usuários:', error);
    return { success: false, message: 'Erro de comunicação com a API.' };
  }
}
