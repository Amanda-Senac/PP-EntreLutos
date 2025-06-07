const form = document.querySelector('.formCadastro')
form?.addEventListener('submit', async (e) => {
  e.preventDefault();

  const name = document.getElementById('name').value;
  const cpf = document.getElementById('cpf').value;
  const password = document.getElementById('password').value;
  const email = document.getElementById('email').value;

  const response = await fetch('http://localhost:3000/usuario/cadastro', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, cpf, password, email })
  });

  const result = await response.json();

  if (result.success) {
    alert("Cadastro concluído!");
    localStorage.setItem('usuario', JSON.stringify({id: result.results.insertId}))
    window.location.href = 'index.html'
  } else {
    alert("Cadastro não concluído!");
  }
});

const formLogin = document.querySelector('.formLogin')
formLogin?.addEventListener('submit', async (e) => {
  e.preventDefault()

  const name = document.getElementById('name').value;
  const password = document.getElementById('password').value;
  const email = document.getElementById('email').value;

  const response = await fetch('http://localhost:3000/usuario/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, password, email })
  })

  const result = await response.json()

  if (result.success) {
    localStorage.setItem('usuario', JSON.stringify(result.data))
    console.log(result)
    alert("Login concluído!");
    window.location.href = 'index.html'
  } else {
    alert("Usuário ou senha incorreta!");
  }
})