import mongoose from "mongoose";

//const url = "mongodb+srv://aluno:123@ifsul.fify4.mongodb.net/"
const url = "mongodb+srv://arthur:1234@cluster0.pxvchom.mongodb.net/?appName=Cluster0"

const conexao = await mongoose.connect(url)

export default conexao;