import { Router } from "express";
import { PessoasController } from "./controllers/PessoasController.js";
import { ConhecimentosController } from "./controllers/ConhecimentosController.js";
import { LoginController } from "./controllers/LoginController.js";

const router = Router();
const pessoaController = new PessoasController();
const conhecimentoController = new ConhecimentosController();
const loginController = new LoginController();

// pessoas

router.get("/pessoas", pessoaController.listarPessoas);
router.post("/pessoas", pessoaController.criarPessoas);
router.post("/login", loginController.login);
router.put("/pessoas/:id", pessoaController.atualizarPessoas);
router.delete("/pessoas/:id", pessoaController.deletarPessoas);

// conhecimentos

router.get("/conhecimentos", conhecimentoController.listarConhecimentos);
router.post("/conhecimentos", conhecimentoController.criarConhecimentos);
router.put("/conhecimentos/:id", conhecimentoController.atualizarConhecimentos);
router.delete("/conhecimentos/:id", conhecimentoController.deletarConhecimentos);

export default router;