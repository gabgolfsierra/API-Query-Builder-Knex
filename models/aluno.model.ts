import { Curso } from "./curso.model";

export class Aluno {
    id: number;
    nome: string;
    email: string;
    cursos: Curso[];

    constructor(id: number, nome: string, email: string, cursos: Curso[]) {
        this.id = id;
        this.nome = nome;
        this.email = email;
        this.cursos = cursos;
    }
}
