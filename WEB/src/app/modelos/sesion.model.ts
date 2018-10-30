import {User} from './user.model';
export class Sesion {
  constructor (
  public token: string,
  public usr: User,
 ){}


}
