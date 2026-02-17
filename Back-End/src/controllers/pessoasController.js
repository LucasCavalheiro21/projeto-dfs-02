import prisma from "../PrismaClient.js";

// GET pessoas

export const listarPessoas = async (request, response) => {

try{

const pessoas = await prisma.pessoas.findMany({

    //orderBy: {nome: "asc"}

});

return response.status(200).json(pessoas);

}catch(error){

return response.status(500).send();

}

};

// POST pessoas

export const criarPessoa = async (request, response) => {

const {nome, email, telefone, descricao} = request.body;

try{

const pessoas = await prisma.pessoas.create({

    data: {nome, email, telefone, descricao}

});

return response.status(201).json(pessoas);

}catch(error){

return response.status(500).send();

}

};

// PUT pessoas

export const atualizarPessoa = async (request, response) => {

const {nome, email, telefone, descricao} = request.body;
const {id} = request.params;

try{

const pessoas = await prisma.pessoas.findUnique({where: {id}});

if(!pessoas){

    return response.status(404).json("Pessoa não encontrada :(");

}

const pessoasUpdated = await prisma.pessoas.update({

    data: {nome, email, telefone, descricao},
    where: {id}

});

return response.status(200).json(pessoasUpdated);

}catch(error){

return response.status(500).send();

}

};

// DELETE pessoas

export const deletarPessoa = async (request, response) => {

const {id} = request.params;

try{

const pessoas = await prisma.pessoas.findUnique({where: {id}});

if(!pessoas){

    return response.status(404).json("Pessoa não encontrada :(");

}

await prisma.pessoas.delete({

    where: {id}

});

return response.status(204).send();

}catch(error){

return response.status(500).send();

}

};