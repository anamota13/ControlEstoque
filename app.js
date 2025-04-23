const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const authRoutes = require('./routes/authRoutes');

const app = express();
const PORT = 3000;

const productRoutes = require("./routes/productRoutes");
app.use("/products", productRoutes);

app.post("/login", (req, res) => {
  // ...validação...

  res.redirect("/dashboard.html"); // mostrar o dashboard
});


app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public'))); 

app.use('/auth', authRoutes);

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
