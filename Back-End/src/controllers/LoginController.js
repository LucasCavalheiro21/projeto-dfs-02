import prisma from "../database/PrismaClient.js";
import bcrypt from 'bcryptjs';
import jwt from "jsonwebtoken";

export class LoginController{

    async login(request, response){
        const { email, password } = request.body;
        try{
            const pessoaExiste = await prisma.pessoas.findUnique({ where: {email} });
            if(!pessoaExiste){
                return response.status(401).json({ error: "Login não encontrado :(" });
            }
            const senhaValida = bcrypt.compareSync(password, pessoaExiste.password);
            if(!senhaValida){
                return response.status(401).json({ error: "Senha incorreta :(" });
            }
            const payload = { id: pessoaExiste.id, email: pessoaExiste.email, isAdmin: pessoaExiste.isAdmin };
            const token = jwt.sign(payload, process.env.SECRET_JWT, { expiresIn: "1h" });
            return response.status(200).json({...payload, token });
        }catch(error){
            return response.status(500).json({ error: "Erro ao realizar login.", detail: error.message });
        }
    }

}