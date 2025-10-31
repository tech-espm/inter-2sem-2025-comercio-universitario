const express = require("express");
const wrap = require("express-async-error-wrapper");

const router = express.Router();

router.get("/", wrap(async (req, res) => {
	res.render("index/index");
}));

router.get("/sobre", wrap(async (req, res) => {
	let opcoes = {
		titulo: "Sobre"
	};

	res.render("index/sobre", opcoes);
}));

router.get("/perfil", wrap(async (req, res) => {
	let opcoes = {
		titulo: "Perfil"
	};

	res.render("index/perfil", opcoes);
}));

router.get("/prod_detalhe", wrap(async (req, res) => {
	let opcoes = {
		titulo: "Detalhe do Produto"
	};

	res.render("index/prod_detalhe", opcoes);
}));

router.get("/carrinho", wrap(async (req, res) => {
	let opcoes = {
		titulo: "Carrinho de Compras"
	};

	res.render("index/carrinho", opcoes);
}));

router.get("/produtos", wrap(async (req, res) => {
	let produtoA = {
		id: 1,
		nome: "Produto A",
		valor: 25
	};

	let produtoB = {
		id: 2,
		nome: "Produto B",
		valor: 15
	};

	let produtoC = {
		id: 3,
		nome: "Produto C",
		valor: 100
	};

	let produtosVindosDoBanco = [ produtoA, produtoB, produtoC ];

	let opcoes = {
		titulo: "Listagem de Produtos",
		produtos: produtosVindosDoBanco
	};

	res.render("index/produtos", opcoes);
}));

module.exports = router;
