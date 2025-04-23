const express = require("express");
const router = express.Router();
const controller = require("../controllers/productController");

router.post("/add", controller.addProduct);
router.put("/edit/:id", controller.editProduct);
router.delete("/delete/:id", controller.deleteProduct);
router.post("/sell", controller.sellProduct); // Rota para registrar a venda
router.get("/list", controller.listProducts);
router.get("/report", controller.generateReport); // Relatório de inventário
router.get("/low-stock", controller.checkLowStock); // Alerta de baixo estoque
router.get("/search/:barcode", controller.searchByBarcode); // 🔍 Pesquisa por código de barras

module.exports = router;
