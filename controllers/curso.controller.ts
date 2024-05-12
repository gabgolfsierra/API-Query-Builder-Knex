import { Knex } from "knex";
import { Aluno } from "../models/aluno.model";
import { Curso } from "../models/curso.model";

export class CursoController {
    private knex: Knex;

    constructor(knex: Knex) {
        this.knex = knex;
    }

    async listarCursos(): Promise<Curso[]> {
        const cursos = await this.knex('cursos').select('*');
        return cursos.map((curso) => new Curso(curso.id, curso.nome, curso.descricao, []));
    }

    async obterCursoPorId(id: number): Promise<Curso | null> {
        const curso = await this.knex('cursos').where('id', id).select('*').first();
        if (!curso) {
            return null; // Explicit return statement if no course found
        }

        const alunosDoCurso = await this.knex('cursos_alunos').where('curso_id', id).select('aluno_id');
        const idsAlunos = alunosDoCurso.map((cursoAluno) => cursoAluno.aluno_id);

        const alunos = await this.knex('alunos').whereIn('id', idsAlunos).select('*');
        curso.alunos = alunos.map((aluno) => new Aluno(aluno.id, aluno.nome, aluno.email, []));

        return curso;
    }

    async criarCurso(curso: Curso): Promise<void> {
        await this.knex('cursos').insert({
            nome: curso.nome,
            descricao: curso.descricao,
        });
    }

    async atualizarCurso(id: number, curso: Curso): Promise<void> {
        await this.knex('cursos').where('id', id).update({
            nome: curso.nome,
            descricao: curso.descricao,
        });
    }

    async atualizarCursoParcial(id: number, patch: Partial<Curso>): Promise<void> {
        const atualizacoes: { [key: string]: any } = {};
        for (const key in patch) {
            if (patch[key] !== undefined) {
                atualizacoes[key] = patch[key];
            }
        }

        if (Object.keys(atualizacoes).length > 0) {
            await this.knex('cursos').where('id', id).update(atualizacoes);
        }
    }

    async deletarCurso(id: number): Promise<void> {
        await this.knex('cursos_alunos').where('curso_id', id).delete();
        await this.knex('cursos').where('id', id).delete();
    }
}
