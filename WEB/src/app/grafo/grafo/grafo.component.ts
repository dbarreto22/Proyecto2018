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

  constructor(private apiService:ApiService) {
    this.idCurso=localStorage.getItem('idCurso');
    this.apiService.getprevias(this.idCurso).subscribe((datos : asignaturaCarrera)=>
    {
      var link = new Link(datos.id,null);
      this.crearNodos(datos,link);
    }, error=>console.log(error));
    alert('entro una vez Nodo '+ JSON.stringify(this.nodes));
  }
  ngOnInit(){
  };
    crearNodos(datos:asignaturaCarrera,link:Link){
      link.target=datos.id;
      this.links.push(link);
      var nodo= new Node(datos.id)
      nodo.nombre=datos.carrera.nombre;
      this.nodes.push(nodo);
      datos.previas.forEach(element=>
      {
        this.crearNodos(element,new Link(datos.id,null));
        nodo.linkCount++;
      
      });
      
    }
}
