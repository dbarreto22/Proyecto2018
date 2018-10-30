export class User {
    constructor(
    public cedula: string,
    public nombre: string,
    public apellido: string,
    public email: string,
    public password: string,
    public calificacionesExamenes: Array<any>,
    public calificacionesCursos: Array<any>,
    public roles: Array<any>
){}
}

