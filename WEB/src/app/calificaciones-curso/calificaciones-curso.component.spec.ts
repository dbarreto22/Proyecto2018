import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CalificacionesCursoComponent } from './calificaciones-curso.component';

describe('CalificacionesCursoComponent', () => {
  let component: CalificacionesCursoComponent;
  let fixture: ComponentFixture<CalificacionesCursoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CalificacionesCursoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CalificacionesCursoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
