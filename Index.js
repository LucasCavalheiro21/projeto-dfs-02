import express, {request, response } from "express"
import prisma from "./PrismaClient.js";

const app = express();
app.use(express.json());

app.get("/pessoas", async (request, response) => {
    
    try{

        const pessoas = await prisma.pessoas.findMany({
           
            //orderBy: {nome: "asc"}

        });

        return response.status(200).json(pessoas);

    }catch(error){

        return response.status(500).send();
    
    }

})

// pagination

app.get("/pessoas-posts", async (request, response) => {

    const {page = 1, limit = 5} = request.query
    const take = Number(limit)
    const skip = (Number(page) - 1) * take

    try{
    
        const pessoas = await prisma.pessoas.findMany({skip, take});
        const total = await prisma.pessoas.count();

        return response.json({

        total,
        page: Number(page),
        totalPages: Math.ceil(total / take),
        data: pessoas

    })

    }catch(error){

        return response.status(500).send()

    }

})

app.post("/pessoas", async (request, response) => {

    const {nome, email, telefone, descricao} = request.body;
    
    try{

            const pessoas = await prisma.pessoas.create({
            data: {nome, email, telefone, descricao}

        })

        return response.status(201).json(pessoas);

    }catch(error){

        return response.status(500).send();

    }

})

app.put("/pessoas/:id", async (request, response) => {

    const {nome, email, telefone, descricao} = request.body;
    const {id} = request.params;

    try{

        const pessoas = await prisma.pessoas.findUnique({where: {id}});

        if(!pessoas){

            return response.status(404).json("User not found :(");

        }

        const pessoasUpdated = await prisma.pessoas.update({

            data: {nome, email, telefone, descricao},
            where: {id}

        })

        return response.status(200).json(pessoasUpdated);

    }catch(error){

        return response.status(500).send();

    }

})

app.delete("/pessoas/:id", async (request, response) => {
    
    const {id} = request.params;
   
    try{

        const pessoas = await prisma.pessoas.findUnique({where: {id}});

        if(!pessoas){

            return response.status(404).json("pessoas not found");

        }

        await prisma.pessoas.delete({

            where: {id}

        })

        return response.status(204).send();

    }catch(error){

        return response.status(500).send();

    }

})

app.listen(8080, () => {

    console.log("Running on port 8080")

})