import { Router } from "express";
import { PessoasController } from "./controllers/PessoasController.js";
import { ConhecimentosController } from "./controllers/ConhecimentosController.js";

const router = Router();
const pessoaController = new PessoasController();
const conhecimentoController = new ConhecimentosController();

// pessoas

router.get("/pessoas", pessoaController.listarPessoas);
router.post("/pessoas", pessoaController.criarPessoas);
router.put("/pessoas/:id", pessoaController.atualizarPessoas);
router.delete("/pessoas/:id", pessoaController.deletarPessoas);

// conhecimentos

router.get("/conhecimentos", conhecimentoController.listarConhecimentos);
router.post("/conhecimentos", conhecimentoController.criarConhecimentos);
router.put("/conhecimentos/:id", conhecimentoController.atualizarConhecimentos);
router.delete("/conhecimentos/:id", conhecimentoController.deletarConhecimentos);

export default router;