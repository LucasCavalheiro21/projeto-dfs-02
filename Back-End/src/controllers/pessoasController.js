import prisma from "../database/PrismaClient.js";

export class PessoasController{

// GET pessoas

    async listarPessoas(request, response){
        try{
            const { nome, descricao } = request.query;
            const pessoas = await prisma.pessoas.findMany({

            // adicionando filtros

            orderBy: { criado_em: "asc" },
            where: {
                ...(nome && {
                nome: {
                    contains: nome,
                    mode: "insensitive"
                }
                }),
                ...(descricao && {
                descricao: {
                    contains: descricao,
                    mode: "insensitive"
                }
                })
            },
            });
            return response.status(200).json(pessoas);
        }catch(error){
            return response.status(500).json({ error: "Erro ao listar pessoas.", detail: error.message });

        }
    }

    // POST pessoas

    async criarPessoas(request, response){
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

    async atualizarPessoas(request, response){
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

    async deletarPessoas(request, response){
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

}