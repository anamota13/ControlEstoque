const fs = require("fs");
const path = require("path");

const DATA_PATH = path.join(__dirname, "../data/products.json");

// Utilitários para ler e escrever produtos
function loadProducts() {
  if (!fs.existsSync(DATA_PATH)) return [];
  const data = fs.readFileSync(DATA_PATH);
  return JSON.parse(data);
}

function saveProducts(products) {
  fs.writeFileSync(DATA_PATH, JSON.stringify(products, null, 2));
}

// Cadastrar produto
exports.addProduct = (req, res) => {
  const products = loadProducts();
  const newProduct = {
    id: Date.now(),
    name: req.body.name,
    price: parseFloat(req.body.price),
    quantity: parseInt(req.body.quantity),
    barcode: req.body.barcode,
  };
  products.push(newProduct);
  saveProducts(products);
  res.status(201).json(newProduct);
};

// Editar produto
exports.editProduct = (req, res) => {
  const id = parseInt(req.params.id);
  const products = loadProducts();
  const index = products.findIndex(p => p.id === id);
  if (index === -1) return res.status(404).json({ message: "Produto não encontrado" });

  const updatedProduct = {
    ...products[index],
    ...req.body,
    price: parseFloat(req.body.price),
    quantity: parseInt(req.body.quantity),
  };

  products[index] = updatedProduct;
  saveProducts(products);
  res.json(updatedProduct);
};

// Excluir produto
exports.deleteProduct = (req, res) => {
  const id = parseInt(req.params.id);
  let products = loadProducts();
  products = products.filter(p => p.id !== id);
  saveProducts(products);
  res.json({ message: "Produto excluído com sucesso" });
};

// Registrar venda
exports.sellProduct = (req, res) => {
  const id = parseInt(req.body.id);
  const quantitySold = parseInt(req.body.quantity);
  const products = loadProducts();
  const index = products.findIndex(p => p.id === id);

  if (index === -1) return res.status(404).json({ message: "Produto não encontrado" });
  if (products[index].quantity < quantitySold)
    return res.status(400).json({ message: "Estoque insuficiente" });

  products[index].quantity -= quantitySold;
  saveProducts(products);
  res.json({ message: "Venda registrada com sucesso" });
};

// Listar produtos
exports.listProducts = (req, res) => {
  const products = loadProducts();
  res.json(products);
};

// Relatório de inventário
exports.generateReport = (req, res) => {
  const products = loadProducts();
  const report = products.map(p => ({
    name: p.name,
    quantity: p.quantity,
    price: p.price,
    totalValue: p.quantity * p.price,
  }));
  res.json(report);
};

// Alerta de estoque baixo
exports.checkLowStock = (req, res) => {
  const products = loadProducts();
  const lowStock = products.filter(p => p.quantity <= 5);
  res.json(lowStock);
};

// Buscar por código de barras
exports.searchByBarcode = (req, res) => {
  const barcode = req.params.barcode;
  const products = loadProducts();
  const product = products.find(p => p.barcode === barcode);

  if (product) {
    res.json(product);
  } else {
    res.status(404).json({ message: "Produto não encontrado" });
  }
};
