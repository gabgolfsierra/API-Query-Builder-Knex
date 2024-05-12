import { AlunoController } from './controllers/aluno.controller.ts';
import { CursoController } from './controllers/curso.controller.ts';
import { knex } from './database';

export const alunoController = new AlunoController(knex);
export const cursoController = new CursoController(knex);
