import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModificarAsignaturaComponent } from './modificar-asignatura.component';

describe('ModificarAsignaturaComponent', () => {
  let component: ModificarAsignaturaComponent;
  let fixture: ComponentFixture<ModificarAsignaturaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModificarAsignaturaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModificarAsignaturaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
