import { Component, OnInit } from '@angular/core';
import APP_CONFIG from '../../app.config';
import { Node, Link } from '../../d3';
import { ApiService } from '../../api.service';
import { asignaturaCarrera } from '../../modelos/asignaturaCarrera.model';
import { RouterOutlet, Router } from '@angular/router';

@Component({
  selector: 'app-grafo',
  templateUrl: './grafo.component.html',
  styleUrls: ['./grafo.component.css']
})
export class GrafoComponent implements OnInit {
  nodes: Node[] = [];
  links: Link[] = [];
  idCurso;
  cursos:asignaturaCarrera;
  x:number=300;
  y:number=50;

  constructor(private apiService:ApiService,private router:Router) {
    this.idCurso=localStorage.getItem('idCurso');
    alert(this.idCurso);
    this.apiService.getprevias(this.idCurso).subscribe((datos : asignaturaCarrera)=>
    {
     // alert(JSON.stringify(datos));
      var link = new Link(datos.asignatura.nombre,null);
      this.crearNodos(datos,link, this.x, this.y);
    }, error=>console.log(error));
    alert('entro una vez Nodo '+ JSON.stringify(this.nodes));
  }
  ngOnInit(){
    let rolElegido=localStorage.getItem('rolElegido');
    if( rolElegido!='3')
    {
      alert('El rol actual no puede acceder a esta función.');
      this.router.navigate(['/'])
    }
  };
    crearNodos(datos:asignaturaCarrera,link:Link, x:number, y:number){
      let auxX, auxY;
      link.target=datos.asignatura.nombre;
      this.links.push(link);
      var nodo= new Node(datos.asignatura.nombre);
      //nodo.nombre=datos.asignatura.nombre;
      nodo.fx=x;
      nodo.fy=y;
      if(datos.previas.length>=1)
      {
        auxX=x;  
      }else 
      {
        auxX=datos.previas.length*120;
      }
      this.nodes.push(nodo);
      auxY=y+120;
      datos.previas.forEach(element=>
      {
       // this.x=this.x+60;
        this.crearNodos(element,new Link(datos.asignatura.nombre,null),auxX,auxY);
      auxX=auxX+120;
        nodo.linkCount++;
      
      });
      
    }
}
