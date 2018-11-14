import { Component, OnInit } from '@angular/core';
import APP_CONFIG from '../../app.config';
import { Node, Link } from '../../d3';
import { ApiService } from '../../api.service';
import { asignaturaCarrera } from '../../modelos/asignaturaCarrera.model';

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

  constructor(private apiService:ApiService) {
    this.idCurso=localStorage.getItem('idCurso');
    this.apiService.getprevias('8').subscribe((datos : asignaturaCarrera)=>
    {
      var link = new Link(datos.asignatura.nombre,null);
      this.crearNodos(datos,link, this.x, this.y);
    }, error=>console.log(error));
    alert('entro una vez Nodo '+ JSON.stringify(this.nodes));
  }
  ngOnInit(){
  };
    crearNodos(datos:asignaturaCarrera,link:Link, x:number, y:number){
      let auxX, auxY;
      link.target=datos.asignatura.nombre;
      this.links.push(link);
      var nodo= new Node(datos.asignatura.nombre);
      //nodo.nombre=datos.asignatura.nombre;
      nodo.fx=x;
      nodo.fy=y;
      auxX=datos.previas.length()=1:x?x-(datos.previas.length()*120)
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
