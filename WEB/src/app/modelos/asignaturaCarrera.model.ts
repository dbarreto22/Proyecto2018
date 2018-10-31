import {asignatura} from './asignatura.model';
import {carrera} from './carrera.model';

export class asignaturaCarrera {
    constructor(
    public id: number,
    public carrera: carrera,
    public asignatura: asignatura,
    
){}
}