import { Component, OnInit, Output } from '@angular/core';
import { Node, Link } from '../../d3';
import { ApiService } from '../../api.service';
import { asignaturaCarrera } from '../../modelos/asignaturaCarrera.model';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-grafo',
  templateUrl: './grafo.component.html',
  styleUrls: ['./grafo.component.css']
})
export class GrafoComponent implements OnInit {
//  nodes: Observable<Node[]>;
//  links: Observable<Link[]>;
//  nodos;
//  enlaces;
  //@Output() nodes:Node[]=[];
  nodes:Node[]=[];
  //@Output() links:Link[]=[];
  links:Link[]=[];
  idCurso;
  cursos: asignaturaCarrera;
  x: number = 300;
  y: number = 50;

  constructor(private apiService: ApiService, private router: Router) {
    this.idCurso = localStorage.getItem('idCurso');
    alert(this.idCurso);
    this.apiService.getprevias(this.idCurso).subscribe((datos: asignaturaCarrera) => {
      //this.idCurso
      var link = new Link(datos.asignatura.nombre, null);
      this.crearNodos(datos, link, this.x, this.y);
    },
      err => {
        this.apiService.mensajeConError(err);
        this.router.navigate(['/inscCursos']);
      });
  //  this.links = this.inicializarEnlaces();
  //  this.nodes=this.inicializarNodos();
   // alert('entro una vez Nodo ' + JSON.stringify(this.nodes));
  }
  ngOnInit() {
    let rolElegido = localStorage.getItem('rolElegido');
    if (rolElegido != '3') {
      alert('El rol actual no puede acceder a esta función.');
      this.router.navigate(['/'])
    }
 /*   this.enlaces.subscribe(
      (data)=> alert('Todo esta bien ' + data),
      err=>{
        this.apiService.mensajeConError(err)
        alert('cagamoooo ' + err)
      }
    );
    this.nodes.subscribe(
      (data)=> alert('Todo esta bien ' + data),
      err=>{
        this.apiService.mensajeConError(err)
        alert('cagamoooo ' + err)
      }
    );
  */  };
 
  crearNodos(datos: asignaturaCarrera, link: Link, x: number, y: number) {
    let auxX, auxY;
//    console.log('hay algooo',datos);
    link.target = datos.asignatura.nombre;
 //   this.enlaces.push(link);
   this.links.push(link);
    var nodo = new Node(datos.asignatura.nombre);
    nodo.fx = x;
    nodo.fy = y;
    if (datos.previas.length >= 1) {
      auxX = x;
    } else {
      auxX = datos.previas.length * 160;
    }
//    this.nodos.push(nodo);
    this.nodes.push(nodo);
    auxY = y + 160;
    datos.previas.forEach(element => {
      this.crearNodos(element, new Link(datos.asignatura.nombre, null), auxX, auxY);
      auxX = auxX + 160;
      nodo.linkCount++;
    });
  }
  verPrevias(){
    console.log('Viendo previas');
  }
/*
  inicializarNodos():Observable<Node[]> {
    console.log(this.nodos);
    return this.nodos;
   }
   inicializarEnlaces():Observable<Link[]> {
    console.log(this.enlaces);
    return this.enlaces;
   }
  */
 }
