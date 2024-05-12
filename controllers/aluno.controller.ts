import { Knex } from "knex";
import { Aluno } from "../models/aluno.model";
import { Curso } from "../models/curso.model";

export class AlunoController {
    private knex: Knex;

    constructor(knex: Knex) {
        this.knex = knex;
    }

    async listarAlunos(): Promise<Aluno[]> {
        const alunos = await this.knex('alunos').select('*');
        return alunos.map((aluno) => new Aluno(aluno.id, aluno.nome, aluno.email, []));
    }

    async obterAlunoPorId(id: number): Promise<Aluno | null> {
        const aluno = await this.knex('alunos').where('id', id).select('*').first();
        if (!aluno) {
            return null;
        }

        const cursosDoAluno = await this.knex('cursos_alunos').where('aluno_id', id).select('curso_id');
        const idsCursos = cursosDoAluno.map((cursoAluno) => cursoAluno.curso_id);

        const cursos = await this.knex('cursos').whereIn('id', idsCursos).select('*');
        aluno.cursos = cursos.map((curso) => new Curso(curso.id, curso.nome, curso.descricao, []));

        return new Aluno(aluno.id, aluno.nome, aluno.email, aluno.cursos);
    }

    async criarAluno(aluno: Aluno): Promise<void> {
        await this.knex('alunos').insert({
            nome: aluno.nome,
            email: aluno.email,
        });
    }

    async atualizarAluno(id: number, aluno: Aluno): Promise<void> {
        await this.knex('alunos').where('id', id).update({
            nome: aluno.nome,
            email: aluno.email,
        });
    }

    async atualizarAlunoParcial(id: number, patch: Partial<Aluno>): Promise<void> {
        const atualizacoes: { [key: string]: any } = {};
        for (const key in patch) {
            if (patch[key] !== undefined) {
                atualizacoes[key] = patch[key];
            }
        }

        if (Object.keys(atualizacoes).length > 0) {
            await this.knex('alunos').where('id', id).update(atualizacoes);
        }
    }

    async deletarAluno(id: number): Promise<void> {
        await this.knex('cursos_alunos').where('aluno_id', id).delete();
        await this.knex('alunos').where('id', id).delete();
    }
}
