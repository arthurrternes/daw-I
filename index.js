import express from "express";
import Genero from './models/Genero.js';
import Musica from './models/Musica.js';

const app = express();
const PORT = 3031;



// Configura o EJS como motor de views
app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");
// pasta onde ficam os arquivos .ejs
app.set("views", "./views"); 
//Liberar acesso a pasta public
import { fileURLToPath } from 'url';
import { dirname } from 'path';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
app.use(express.static(__dirname + '/public'))



app.get("/", (req, res) => {
  res.render("index");
});

//Rotas do gênero
app.get("/genero/lst", async (req, res) => {
  const generos = await Genero.find()
  res.render("genero/lst", {generos});
});

app.get("/genero/add",  (req, res) => {

  res.render("genero/add");
});

app.post("/genero/add", async (req, res) => {
  const nome = req.body.nome;
  //grava no banco de dados(Mongo)
  await Genero.create({nome});
  res.render("genero/addok");
});

//excluir
app.get('/genero/del/:id', async (req, res) => {
const generos = await Genero.findByIdAndDelete(req.params.id)
res.redirect("/genero/lst")

})

//Edição

app.get('/genero/edit/:id', async (req, res) => {

const genero = await Genero.findById(req.params.id)

res.render("genero/edit", {genero})

})

app.post('/genero/edit/:id', async (req, res) => {

const genero = await Genero.findByIdAndUpdate(req.params.id, req.body)

res.render("genero/editok")

})

//Rotas de música

app.get("/musica/lst", async (req, res) => {
  const musicas = await Musica.find()
  res.render("musica/lst", {musicas});
});

app.get("/musica/add", (req, res) => {
  res.render("musica/add");
});

app.post("/musica/add", async (req, res) => {
  const {nome, duracao, artista, anoLancamento} = req.body;
  await Musica.create({nome, duracao, artista, anoLancamento})
  res.render("musica/addok");
});

app.get("/cadastro", (req, res) => {
  res.render("cadastro");
});

app.post("/cadastro", (req, res) => {
  res.render("cadastrook");
});

app.get("/detalhe", (req, res) => {
  res.render("detalhe");
});
app.get("/lista", (req, res) => {
  res.render("lista");
});

//excluir
app.get('/musica/del/:id', async (req, res) => {
const musicas = await Musica.findByIdAndDelete(req.params.id)
res.redirect("/musica/lst")

})

//Edição

app.get('/musica/edit/:id', async (req, res) => {

const musica = await Musica.findById(req.params.id)

res.render("musica/edit", {musica})

})

app.post('/musica/edit/:id', async (req, res) => {

const musica = await Musica.findByIdAndUpdate(req.params.id, req.body)

res.render("musica/editok")

})

app.listen(PORT, ()=>{
 console.log(
    `Servidor rodando em http://localhost:${PORT}`)
});
