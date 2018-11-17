import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarCursosCarrerasComponent } from './listar-cursos-carreras.component';

describe('ListarCursosCarrerasComponent', () => {
  let component: ListarCursosCarrerasComponent;
  let fixture: ComponentFixture<ListarCursosCarrerasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListarCursosCarrerasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListarCursosCarrerasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
