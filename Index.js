import express, {request, response } from "express"
import prisma from "./PrismaClient.js";

const app = express();
app.use(express.json());

app.get("/pessoas", async (request, response) => {
    
    try{

        const Pessoas = await prisma.Pessoas.findMany({
           
            orderBy: {name: "asc"}

        });

        return response.status(200).json(Pessoas);

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
    
        const Pessoas = await prisma.Pessoas.findMany({skip, take});
        const total = await prisma.Pessoas.count();

        return response.json({

        total,
        page: Number(page),
        totalPages: Math.ceil(total / take),
        data: Pessoas

    })

    }catch(error){

        return response.status(500).send()

    }

})

app.post("/pessoas", async (request, response) => {

    const {name, email, telefone, descricao} = request.body;
    
    try{

            const Pessoas = await prisma.Pessoas.create({
            data: {name, email, telefone, descricao}

        })

        return response.status(201).json(Pessoas);

    }catch(error){

        return response.status(500).send();

    }

})

app.put("/pessoas/:id", async (request, response) => {

    const {name, email, telefone, descricao} = request.body;
    const {id} = request.params;

    try{

        const Pessoas = await prisma.Pessoas.findUnique({where: {id}});

        if(!Pessoas){

            return response.status(404).json("User not found :(");

        }

        const PessoasUpdated = await prisma.Pessoas.update({

            data: {name, email, telefone, descricao},
            where: {id}

        })

        return response.status(200).json(PessoasUpdated);

    }catch(error){

        return response.status(500).send();

    }

})

app.delete("/pessoas/:id", async (request, response) => {
    
    const {id} = request.params;
   
    try{

        const Pessoas = await prisma.Pessoas.findUnique({where: {id}});

        if(!Pessoas){

            return response.status(404).json("Pessoas not found");

        }

        await prisma.Pessoas.delete({

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