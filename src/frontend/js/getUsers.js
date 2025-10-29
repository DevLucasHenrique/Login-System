const URL = 'http://localhost:5000/users';

export async function getUsers() {
  const resp = await fetch(URL);
  if (!resp.ok) throw new Error(`API error ${resp.status}`);
  const users = await resp.json();
  return users;

}

getUsers();