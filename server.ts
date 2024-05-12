import express, { Request, Response } from 'express';
import { AlunoController } from './controllers/aluno.controller.ts';
import { CursoController } from './controllers/curso.controller.ts';
import { knex } from './database';

export class Server {
    private app: express.Application;
    private alunoController: AlunoController;
    private cursoController: CursoController;

    constructor() {
        this.app = express();
        this.alunoController = new AlunoController(knex);
        this.cursoController = new CursoController(knex);
    }

    public start(): void {
        this.configurarRotas();
        this.iniciarServidor();
    }

    private configurarRotas(): void {
        // Rotas para alunos
        this.app.get('/alunos', async (req: Request, res: Response) => {
            const alunos = await this.alunoController.listarAlunos();
            res.json(alunos);
        });

        this.app.get('/alunos/:id', async (req: Request, res: Response) => {
            const id = parseInt(req.params.id);
            const aluno = await this.alunoController.obterAlunoPorId(id);
            if (!aluno) {
                res.status(404).json({ mensagem: 'Aluno não encontrado' });
                return;
            }

            res.json(aluno);
        });

       
    }

    private iniciarServidor(): void {
        const port = 3000; 
        this.app.listen(port, () => console.log(`Servidor escutando na porta ${port}`));
    }
}
