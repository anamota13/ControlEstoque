// controllers/authController.js
const fs = require('fs');
const bcrypt = require('bcryptjs');
const path = require('path');

const USERS_FILE = path.join(__dirname, '../data/users.json');

const readUsers = () => {
  if (!fs.existsSync(USERS_FILE)) return [];
  const data = fs.readFileSync(USERS_FILE);
  return JSON.parse(data);
};

const writeUsers = (users) => {
  fs.writeFileSync(USERS_FILE, JSON.stringify(users, null, 2));
};

exports.register = (req, res) => {
  const { username, password } = req.body;
  const users = readUsers();

  const userExists = users.find(user => user.username === username);
  if (userExists) return res.status(400).json({ message: 'Usuário já existe' });

  const hashedPassword = bcrypt.hashSync(password, 8);

  users.push({ username, password: hashedPassword });
  writeUsers(users);

  res.status(201).json({ message: 'Usuário registrado com sucesso' });
};

exports.login = (req, res) => {
  const { username, password } = req.body;
  const users = readUsers();

  const user = users.find(u => u.username === username);
  if (!user) return res.status(400).json({ message: 'Usuário não encontrado' });

  const validPassword = bcrypt.compareSync(password, user.password);
  if (!validPassword) return res.status(401).json({ message: 'Senha incorreta' });

  res.status(200).json({ message: 'Login realizado com sucesso' });
};
