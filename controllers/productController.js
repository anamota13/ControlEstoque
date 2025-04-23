// Pesquisar produto pelo código de barras
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
  