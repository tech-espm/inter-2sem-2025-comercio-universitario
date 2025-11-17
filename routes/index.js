const express = require("express");
const wrap = require("express-async-error-wrapper");
const sql = require("../data/sql");
const multer = require("multer");
const fs = require("fs");
const path = require("path");

const router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

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
	let produtos;

	await sql.connect(async sql => {
		// Tudo aqui dentro é executado com a conexão aberta!

		produtos = await sql.query("select id, nome, descricao, endereco, valor, nota, date_format(data, '%d/%m/%Y') data from produto");

		//...
	});

	let opcoes = {
		titulo: "Produtos",
		produtos: produtos
	};

	res.render("index/produtos", opcoes);
}));

router.get("/cadastrar", wrap(async (req, res) => {
	let opcoes = {
		titulo: "Cadastro de Produtos"
	};

	res.render("index/cadastrar", opcoes);
}));

router.post("/api/cadastrar", upload.single("imagem"), wrap(async (req, res) => {
	
	let produto = req.body;

	if (!produto.nome) {
		res.status(400).json("Nome inválido!");
		return;
	}

	if (!produto.descricao) {
		res.status(400).json("Descrição inválida!");
		return;
	}

	if (!produto.endereco) {
		res.status(400).json("Endereço inválido!");
		return;
	}

	produto.valor = parseFloat(produto.valor);
	if (!produto.valor) {
		res.status(400).json("Valor inválido!");
		return;
	}

	produto.nota = parseFloat(produto.nota);
	if (!produto.nota) {
		res.status(400).json("Nota inválida!");
		return;
	}

	if (!req.file) {
		res.status(400).json("Imagem inválida!");
		return;
	}

	let id;

	await sql.connect(async sql => {
		// Tudo aqui dentro é executado com a conexão aberta!

		let parametros = [
			produto.nome,
			produto.descricao,
			produto.endereco,
			produto.valor,
			produto.nota,
		];

		await sql.query("insert into produto (nome, descricao, endereco, valor, nota, data) values (?, ?, ?, ?, ?, current_timestamp())", parametros);

		id = await sql.scalar("select last_insert_id()");
	});

	const produtosDir = path.join(__dirname, "..", "public", "img", "produtos");

	const ext = path.extname(req.file.originalname) || ".jpg";
	const nomeArquivo = `${id}${ext}`;
	const caminhoArquivo = path.join(produtosDir, nomeArquivo);

	fs.writeFileSync(caminhoArquivo, req.file.buffer);

	res.json(true);
}));

module.exports = router;
