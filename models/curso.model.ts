import { Aluno } from "./aluno.model";

export class Curso {
    id: number;
    nome: string;
    descricao: string;
    alunos: Aluno[];

    constructor(id: number, nome: string, descricao: string, alunos: Aluno[]) {
        this.id = id;
        this.nome = nome;
        this.descricao = descricao;
        this.alunos = alunos;
    }
}
