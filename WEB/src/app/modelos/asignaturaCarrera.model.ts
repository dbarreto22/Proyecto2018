import {asignatura} from './asignatura.model';
import {carrera} from './carrera.model';

export class asignaturaCarrera {
    constructor(
    public id: string,
    public carrera: carrera,
    public asignatura: asignatura,
    
){}
}