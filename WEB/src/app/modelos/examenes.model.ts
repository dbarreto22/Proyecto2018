import { asignaturaCarrera } from './asignaturaCarrera.model';

export class examenes {
    constructor(
    public id: number,
    public fecha: string,
    public asignatura_Carrera: asignaturaCarrera,
){}
}
