import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModificarCarreraComponent } from './modificar-carrera.component';

describe('ModificarCarreraComponent', () => {
  let component: ModificarCarreraComponent;
  let fixture: ComponentFixture<ModificarCarreraComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModificarCarreraComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModificarCarreraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
