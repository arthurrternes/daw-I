import express from "express";
import Genero from './models/Genero.js';
import Musica from './models/Musica.js';
import Artista from './models/Artista.js';
import Album from './models/Album.js';
const app = express();
const PORT = 3032;



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

//artista 
app.get("/Artista/lst", async (req, res) => {
  const artista = await Artista.find()
  res.render("artista/lst", {artista});
});

app.get("/artista/add",  (req, res) => {

  res.render("artista/add");
});

app.post("/artista/add", async (req, res) => {
  const {nome,pais,ano} = req.body;
  //grava no banco de dados(Mongo)
  await Artista.create({nome,pais,ano});
  res.render("artista/addok");
});

//excluir
app.get('/artista/del/:id', async (req, res) => {
const artista = await Artista.findByIdAndDelete(req.params.id)
res.redirect("/artista/lst")

})

//Edição

app.get('/artista/edit/:id', async (req, res) => {

const artista = await Artista.findById(req.params.id)

res.render("artista/edit", {artista})

})

app.post('/artista/edit/:id', async (req, res) => {

const artista = await Artista.findByIdAndUpdate(req.params.id, req.body)

res.render("artista/editok")

})

//album
app.get("/album/lst", async (req, res) => {
  const albums = await Album.find()
  res.render("album/lst", {albums});
});

app.get("/album/add",  (req, res) => {

  res.render("album/add");
});

app.post("/album/add", async (req, res) => {
  const {nome,artista,ano} = req.body ;
  //grava no banco de dados(Mongo)
  await Album.create({nome,artista,ano});
  res.render("album/addok");
});


//excluir
app.get('/album/del/:id', async (req, res) => {
const albums = await Album.findByIdAndDelete(req.params.id)
res.redirect("/album/lst")

})

//Edição

app.get('/album/edit/:id', async (req, res) => {

const album = await Album.findById(req.params.id)

res.render("album/edit", {album})

})

app.post('/album/edit/:id', async (req, res) => {

const album = await Album.findByIdAndUpdate(req.params.id, req.body)

res.render("album/editok")

})

app.listen(PORT, ()=>{
 console.log(
    `Servidor rodando em http://localhost:${PORT}`)
});
