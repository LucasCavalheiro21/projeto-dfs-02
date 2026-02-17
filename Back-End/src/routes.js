import { Router } from "express";

import {
    listarPessoas,
    criarPessoa,
    atualizarPessoa,
    deletarPessoa
} from "./controllers/pessoasController.js";

import {
    listarConhecimentos,
    criarConhecimento,
    atualizarConhecimento,
    deletarConhecimento
} from "./controllers/conhecimentosController.js";

const routes = Router();


// pessoas

routes.get("/pessoas", listarPessoas);
routes.post("/pessoas", criarPessoa);
routes.put("/pessoas/:id", atualizarPessoa);
routes.delete("/pessoas/:id", deletarPessoa);


// conhecimentos

routes.get("/conhecimentos", listarConhecimentos);
routes.post("/conhecimentos", criarConhecimento);
routes.put("/conhecimentos/:id", atualizarConhecimento);
routes.delete("/conhecimentos/:id", deletarConhecimento);

export default routes;
