import { Rol } from "./rol.model";

export class usuario {
    constructor(
    
){}
    public cedula;
    public nombre;
    public apellido;
    public email;
    public password;
    public roles: Array<Rol>;
    public estado: string;
}