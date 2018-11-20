import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import {cursos} from '../modelos/cursos.model';
import {ApiService} from '../api.service'; 
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';


@Injectable()
export class cursosResolver implements Resolve<object[]> {
  constructor(private apiService: ApiService, private router: Router) { }

  public resolve = (router: ActivatedRouteSnapshot, state: RouterStateSnapshot): 
                    Observable<object[]> => this.apiService.getAllCarrera();

 /* resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<cursos[]> {
//    let id = route.paramMap.get('country-id');
//    console.log('Resolving for country id:' + id);
    
    return this.apiService.getAllCursos().pipe(map((data:cursos[]) => {
      if (data) {
        return data;
      } else {
        this.router.navigate(['/']);
        return null;
      }
    }));
  }*/
}