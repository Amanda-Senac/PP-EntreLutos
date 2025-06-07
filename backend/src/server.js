const express = require('express');
const cors = require('cors');
const connection = require('./db_config');
const app = express();

app.use(cors());
app.use(express.json());

const port = 3000;

app.get('/', (req, res) => {
    return res.send('Hello, World!')
})

app.post('/usuario/cadastro', (req, res) => {
    const { name, cpf, password, email} = req.body;
    
    const query = 'INSERT INTO usuario (name, cpf, password, email) VALUES (?, ?, ?, ?)'
    connection.query(query, [name, cpf, password, email], (err, results) => {
        if (err) {
            return res.status(500).json({ success: false, err, message: 'Erro no servidor'})
        }
        res.status(201).json({success: true, results, message: 'Sucesso no cadastro!'})
    })
})

app.post('/usuario/login', (req, res) => {
    const {name, password, email} = req.body

    const query = 'SELECT * FROM usuario WHERE name = ? AND password = ? AND email = ?'
    connection.query(query, [name, password, email], (err, results) => {
        if (err) {
            return res.status(500).json({ success: false, message: 'Erro no servidor!'})
    }

    if (results.length > 0) {
        res.json({ success: true, message: 'Sucesso no login!', data: results[0]})
    } else {
        res.json({ succes: false, message: 'Usuário ou senha incorretos!'})
    } 
    })
})

app.listen(port, () => console.log(`Server rodando na porta ${port}`))