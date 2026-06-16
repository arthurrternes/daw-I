import conexao from "../config/conexao.js";

const AlbumSchema = new conexao.Schema({
  nome: String,
  artista: String,
  ano: Number
});

const Album = conexao.model("Album", AlbumSchema);

export default Album;